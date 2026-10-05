FROM mockoon/cli:latest

COPY chatum.json /data/chatum.json

CMD ["sh", "-c", "mockoon-cli start --data /data/chatum.json --port $PORT --hostname 0.0.0.0"]
