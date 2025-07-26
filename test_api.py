import requests
import json

BASE_URL = "http://localhost:5000/api"

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    """
    Prints test result.
    If passed, prints only success.
    If failed, prints request, expected vs got, and response body.
    """
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"{test_name}: FAILED")
        if request_data:
            print(f"  Request: {request_data}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")

def test_register_user():
    """
    Tests user registration.
    Expected status codes are 201 (created) or 409 (conflict if user exists).
    """
    payload = {"username": "testuser", "password": "testpassword"}
    res = requests.post(f"{BASE_URL}/register", json=payload)
    passed = res.status_code in [201, 409]
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)

def test_login():
    """
    Tests user login.
    On success, expects 200 status and an 'access_token' in JSON response.
    Returns the token for authenticated requests.
    """
    payload = {"username": "testuser", "password": "testpassword"}
    res = requests.post(f"{BASE_URL}/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except json.JSONDecodeError:
            passed = False
    print_result("Login Test", passed, "status 200 and access_token", res.status_code, payload, res.text)
    return token

def test_add_product(token):
    """
    Tests adding a new product.
    Must include Authorization header with Bearer token.
    Returns product_id on success.
    """
    if not token:
        print_result("Add Product", False, "valid token", "no token provided")
        return None
        
    payload = {
        "name": "Laptop",
        "type": "Electronics",
        "sku": "LPTP-001",
        "image_url": "https://example.com/laptop.jpg",
        "description": "A powerful new laptop",
        "quantity": 10,
        "price": 1200.50
    }
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.post(f"{BASE_URL}/products", json=payload, headers=headers)
    product_id = None
    passed = res.status_code == 201
    if passed:
        try:
            product_id = res.json().get("product_id")
            if product_id is None:
                passed = False
        except json.JSONDecodeError:
            passed = False
            
    print_result("Add Product", passed, "status 201 and product_id", res.status_code, payload, res.text)
    return product_id

def test_update_quantity(token, product_id):
    """
    Tests updating the quantity for a specific product.
    """
    if not token or not product_id:
        print_result("Update Quantity", False, "valid token and product_id", "token or product_id missing")
        return

    new_quantity = 25
    payload = {"quantity": new_quantity}
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.put(f"{BASE_URL}/products/{product_id}/quantity", json=payload, headers=headers)
    passed = res.status_code == 200
    if passed:
        try:
            updated_qty = res.json().get("quantity")
            if updated_qty != new_quantity:
                passed = False
        except json.JSONDecodeError:
            passed = False
            
    print_result("Update Quantity", passed, f"status 200 and quantity {new_quantity}", res.status_code, payload, res.text)
    return passed


def test_get_products(token):
    """
    Tests fetching the list of products.
    """
    if not token:
        print_result("Get Products", False, "valid token", "no token provided")
        return
        
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/products", headers=headers)
    passed = res.status_code == 200
    if passed:
        try:
            products = res.json()
            if not isinstance(products, list):
                passed = False
        except json.JSONDecodeError:
            passed = False

    print_result("Get Products", passed, "status 200 and a list of products", res.status_code, response_body=res.text)


def run_all_tests():
    """
    Runs all tests in sequence.
    If a critical test fails, subsequent tests are skipped.
    """
    print("--- Starting API Tests ---")
    test_register_user()
    token = test_login()

    if not token:
        print("Login failed. Skipping authenticated tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("Add product failed. Skipping further product tests.")
        return
        
    update_passed = test_update_quantity(token, product_id)
    if not update_passed:
        print("Update quantity failed. Skipping get products test.")
        return

    test_get_products(token)
    print("--- API Tests Finished ---")

if __name__ == "__main__":
    run_all_tests()
