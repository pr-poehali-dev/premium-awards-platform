'''
Business: API для управления каталогом изделий (CRUD операции для категорий, продуктов и медиа)
Args: event - dict с httpMethod, body, queryStringParameters, pathParams
      context - object с attributes: request_id, function_name
Returns: HTTP response dict с данными каталога
'''

import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    query_params = event.get('queryStringParameters', {})
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        resource = query_params.get('resource', 'products')
        resource_id = query_params.get('id')
        
        if resource == 'categories':
            result = handle_categories(cur, conn, method, resource_id, event)
        elif resource == 'products':
            result = handle_products(cur, conn, method, resource_id, event)
        elif resource == 'media':
            result = handle_media(cur, conn, method, resource_id, event)
        else:
            result = {'statusCode': 404, 'body': json.dumps({'error': 'Resource not found'})}
        
        return {
            'statusCode': result.get('statusCode', 200),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': result.get('body', '{}')
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if conn:
            conn.close()

def handle_categories(cur, conn, method: str, resource_id: Optional[str], event: Dict) -> Dict:
    if method == 'GET':
        if resource_id:
            cur.execute('SELECT * FROM categories WHERE id = %s', (resource_id,))
            category = cur.fetchone()
            if not category:
                return {'statusCode': 404, 'body': json.dumps({'error': 'Category not found'})}
            return {'body': json.dumps(dict(category))}
        else:
            cur.execute('SELECT * FROM categories ORDER BY sort_order, name')
            categories = cur.fetchall()
            return {'body': json.dumps([dict(c) for c in categories])}
    
    elif method == 'POST':
        data = json.loads(event.get('body', '{}'))
        cur.execute(
            '''INSERT INTO categories (name, slug, description, parent_id, sort_order) 
               VALUES (%s, %s, %s, %s, %s) RETURNING *''',
            (data.get('name'), data.get('slug'), data.get('description'), 
             data.get('parent_id'), data.get('sort_order', 0))
        )
        category = cur.fetchone()
        conn.commit()
        return {'statusCode': 201, 'body': json.dumps(dict(category))}
    
    elif method == 'PUT' and resource_id:
        data = json.loads(event.get('body', '{}'))
        cur.execute(
            '''UPDATE categories 
               SET name = %s, slug = %s, description = %s, parent_id = %s, 
                   sort_order = %s, updated_at = CURRENT_TIMESTAMP
               WHERE id = %s RETURNING *''',
            (data.get('name'), data.get('slug'), data.get('description'),
             data.get('parent_id'), data.get('sort_order'), resource_id)
        )
        category = cur.fetchone()
        if not category:
            return {'statusCode': 404, 'body': json.dumps({'error': 'Category not found'})}
        conn.commit()
        return {'body': json.dumps(dict(category))}
    
    return {'statusCode': 405, 'body': json.dumps({'error': 'Method not allowed'})}

def handle_products(cur, conn, method: str, resource_id: Optional[str], event: Dict) -> Dict:
    if method == 'GET':
        if resource_id:
            cur.execute('''
                SELECT p.*, c.name as category_name,
                       (SELECT json_agg(pm.*) FROM product_media pm WHERE pm.product_id = p.id) as media,
                       (SELECT json_agg(pa.*) FROM product_attributes pa WHERE pa.product_id = p.id) as attributes
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.id = %s
            ''', (resource_id,))
            product = cur.fetchone()
            if not product:
                return {'statusCode': 404, 'body': json.dumps({'error': 'Product not found'})}
            return {'body': json.dumps(dict(product), default=str)}
        else:
            query_params = event.get('queryStringParameters', {})
            category_id = query_params.get('category_id')
            is_active = query_params.get('is_active')
            
            where_clauses = []
            params = []
            
            if category_id:
                where_clauses.append('p.category_id = %s')
                params.append(category_id)
            if is_active is not None:
                where_clauses.append('p.is_active = %s')
                params.append(is_active == 'true')
            
            where_sql = ' WHERE ' + ' AND '.join(where_clauses) if where_clauses else ''
            
            cur.execute(f'''
                SELECT p.*, c.name as category_name,
                       (SELECT url FROM product_media WHERE product_id = p.id AND is_primary = true LIMIT 1) as primary_image
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                {where_sql}
                ORDER BY p.sort_order, p.name
            ''', tuple(params))
            products = cur.fetchall()
            return {'body': json.dumps([dict(p) for p in products], default=str)}
    
    elif method == 'POST':
        data = json.loads(event.get('body', '{}'))
        cur.execute(
            '''INSERT INTO products (name, slug, description, short_description, price, category_id, is_active, sort_order) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *''',
            (data.get('name'), data.get('slug'), data.get('description'), 
             data.get('short_description'), data.get('price'), data.get('category_id'),
             data.get('is_active', True), data.get('sort_order', 0))
        )
        product = cur.fetchone()
        conn.commit()
        return {'statusCode': 201, 'body': json.dumps(dict(product), default=str)}
    
    elif method == 'PUT' and resource_id:
        data = json.loads(event.get('body', '{}'))
        cur.execute(
            '''UPDATE products 
               SET name = %s, slug = %s, description = %s, short_description = %s,
                   price = %s, category_id = %s, is_active = %s, sort_order = %s,
                   updated_at = CURRENT_TIMESTAMP
               WHERE id = %s RETURNING *''',
            (data.get('name'), data.get('slug'), data.get('description'),
             data.get('short_description'), data.get('price'), data.get('category_id'),
             data.get('is_active'), data.get('sort_order'), resource_id)
        )
        product = cur.fetchone()
        if not product:
            return {'statusCode': 404, 'body': json.dumps({'error': 'Product not found'})}
        conn.commit()
        return {'body': json.dumps(dict(product), default=str)}
    
    return {'statusCode': 405, 'body': json.dumps({'error': 'Method not allowed'})}

def handle_media(cur, conn, method: str, resource_id: Optional[str], event: Dict) -> Dict:
    if method == 'GET':
        query_params = event.get('queryStringParameters', {})
        product_id = query_params.get('product_id')
        
        if not product_id:
            return {'statusCode': 400, 'body': json.dumps({'error': 'product_id required'})}
        
        cur.execute('SELECT * FROM product_media WHERE product_id = %s ORDER BY sort_order', (product_id,))
        media = cur.fetchall()
        return {'body': json.dumps([dict(m) for m in media], default=str)}
    
    elif method == 'POST':
        data = json.loads(event.get('body', '{}'))
        cur.execute(
            '''INSERT INTO product_media (product_id, media_type, url, title, alt_text, sort_order, is_primary) 
               VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *''',
            (data.get('product_id'), data.get('media_type'), data.get('url'),
             data.get('title'), data.get('alt_text'), data.get('sort_order', 0),
             data.get('is_primary', False))
        )
        media = cur.fetchone()
        conn.commit()
        return {'statusCode': 201, 'body': json.dumps(dict(media), default=str)}
    
    elif method == 'PUT' and resource_id:
        data = json.loads(event.get('body', '{}'))
        cur.execute(
            '''UPDATE product_media 
               SET media_type = %s, url = %s, title = %s, alt_text = %s,
                   sort_order = %s, is_primary = %s
               WHERE id = %s RETURNING *''',
            (data.get('media_type'), data.get('url'), data.get('title'),
             data.get('alt_text'), data.get('sort_order'), data.get('is_primary'), resource_id)
        )
        media = cur.fetchone()
        if not media:
            return {'statusCode': 404, 'body': json.dumps({'error': 'Media not found'})}
        conn.commit()
        return {'body': json.dumps(dict(media), default=str)}
    
    return {'statusCode': 405, 'body': json.dumps({'error': 'Method not allowed'})}