import http.server
import socketserver
import os

PORT = 8000

class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If the path exists as a directory or file, let default handler handle it
        if os.path.exists(self.translate_path(self.path)):
            super().do_GET()
            return
            
        # Try appending .html
        html_path = self.translate_path(self.path + ".html")
        if os.path.exists(html_path):
            self.path += ".html"
            super().do_GET()
            return
            
        # 404 if neither works
        super().do_GET()

# Allow address reuse to prevent "Address already in use" errors on restart
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), CleanUrlHandler) as httpd:
    print(f"Serving with Clean URLs at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
