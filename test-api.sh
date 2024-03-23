# Store to blockchain
curl -X POST \
-H "Content-Type: application/json" \
-d '{"content": "yeah"}' \
http://localhost:3001/api/writeContract

# Read from blockchain with the key returned above
curl -X GET \
http://localhost:3001/api/readContract/REPLACE-ME

