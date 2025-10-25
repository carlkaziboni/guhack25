from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    def connect(self, websocket: WebSocket):
        self.active_connections.append(websocket)
        websocket.send_json(
            {
                "question": "What specific challenge or goal in your career are you trying to solve right now?"
            }
        )

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
