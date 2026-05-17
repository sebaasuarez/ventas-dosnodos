import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Cargar variables de entorno desde .env en la raíz del proyecto
load_dotenv()

def get_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        port=os.getenv('DB_PORT', '5432'),
        database=os.getenv('DB_NAME', 'siprum_db'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASS', 'postgres')
    )

def list_tables():
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT version();")
            version = cur.fetchone()[0]
            
            cur.execute("""
                SELECT table_schema, table_name 
                FROM information_schema.tables 
                WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
                ORDER BY table_schema, table_name
            """)
            tables = [f"{row[0]}.{row[1]}" for row in cur.fetchall()]
            return {"version": version, "tables": tables}
    except Exception as e:
        return {"error": str(e)}

def describe_table(table_path):
    try:
        if '.' in table_path:
            schema, table_name = table_path.split('.')
        else:
            schema, table_name = 'public', table_path

        conn = get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = %s AND table_schema = %s
                ORDER BY ordinal_position
            """, (table_name, schema))
            return cur.fetchall()
    except Exception as e:
        return {"error": str(e)}

def get_relations(table_path=None):
    try:
        schema, table_name = None, None
        if table_path and '.' in table_path:
            schema, table_name = table_path.split('.')
        elif table_path:
            table_name = table_path

        conn = get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            query = """
                SELECT
                    kcu.table_schema      AS from_schema,
                    kcu.table_name        AS from_table,
                    kcu.column_name       AS from_column,
                    ccu.table_schema      AS to_schema,
                    ccu.table_name        AS to_table,
                    ccu.column_name       AS to_column,
                    rc.constraint_name
                FROM information_schema.referential_constraints rc
                JOIN information_schema.key_column_usage kcu
                    ON kcu.constraint_name = rc.constraint_name
                JOIN information_schema.constraint_column_usage ccu
                    ON ccu.constraint_name = rc.unique_constraint_name
                WHERE 1=1
            """
            params = []
            if table_name:
                if schema:
                    query += " AND ((kcu.table_name = %s AND kcu.table_schema = %s) OR (ccu.table_name = %s AND ccu.table_schema = %s))"
                    params = [table_name, schema, table_name, schema]
                else:
                    query += " AND (kcu.table_name = %s OR ccu.table_name = %s)"
                    params = [table_name, table_name]

            query += " ORDER BY kcu.table_schema, kcu.table_name"
            cur.execute(query, params)
            rows = cur.fetchall()

            relations = []
            for row in rows:
                relations.append({
                    "relation": f"{row['from_schema']}.{row['from_table']}.{row['from_column']} → {row['to_schema']}.{row['to_table']}.{row['to_column']}",
                    "constraint": row['constraint_name']
                })
            return {"count": len(relations), "relations": relations}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import sys
    cmd = sys.argv[1] if len(sys.argv) > 1 else "list"
    if cmd == "list":
        print(json.dumps(list_tables(), indent=2))
    elif cmd == "describe" and len(sys.argv) > 2:
        print(json.dumps(describe_table(sys.argv[2]), indent=2))
    elif cmd == "relations":
        table = sys.argv[2] if len(sys.argv) > 2 else None
        print(json.dumps(get_relations(table), indent=2))
    else:
        print(json.dumps({"usage": "python db_inspector.py list | describe <table> | relations [table]"}))
