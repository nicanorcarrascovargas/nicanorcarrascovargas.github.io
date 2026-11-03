#!/usr/bin/env python3
"""Check local HTML links and resource paths in the generated website."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
origin = "nicanorcarrascovargas.github.io"
class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if value and name in ("href", "src", "poster"):
                self.urls.append(value)
            elif value and name == "srcset" and not value.startswith("data:"):
                self.urls.extend(item.strip().split()[0] for item in value.split(",") if item.strip())

errors = []
pages = list(root.rglob("*.html"))
if not pages:
    sys.exit("No generated HTML found")
for page in pages:
    parser = Links()
    parser.feed(page.read_text(encoding="utf-8"))
    for url in parser.urls:
        parts = urlsplit(url)
        if parts.scheme and parts.scheme not in ("http", "https"):
            continue
        if parts.netloc and parts.netloc != origin:
            continue
        if not parts.path:
            continue
        target = (root / unquote(parts.path).lstrip("/") if parts.path.startswith("/") else page.parent / unquote(parts.path)).resolve()
        if not target.is_relative_to(root) or not (target.is_file() or (target / "index.html").is_file()):
            errors.append(f"{page.relative_to(root)}: {url}")
if errors:
    print("Missing local link targets:\n" + "\n".join(sorted(set(errors))))
    sys.exit(1)
print(f"Checked {len(pages)} HTML files: all local link targets exist.")
