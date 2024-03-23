# Store to blockchain
curl -X POST \
-H "Content-Type: application/json" \
-d '{"content": "neah", "id": "1", "name": "fireball"}' \
http://localhost:3001/api/writeContract

# Read from blockchain with the key returned above
curl -X GET \
http://localhost:3001/api/readContract/REPLACEME

