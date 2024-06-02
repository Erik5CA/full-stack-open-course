## 0.4: New note diagram

```mermaid
sequenceDiagram
participant user
participant browser
participant server

    user->>browser: Write in input field and click Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with the data
    activate server
    server-->>browser: HTTP Status Code 302
    Note right of server: server access data and creates a new object and adds it to an array called notes.
    deactivate server

    Note right of server: server asks the browser to perform a new HTTP GET
    Note right of browser:  the browser reloads the Notes page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
