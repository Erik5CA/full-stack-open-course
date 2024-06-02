## 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
participant user
participant browser
participant server

    user->>browser: Write in input field and click Save button

    Note right of browser: The browser send AJAX Request with the info of the form
    Note right of browser: Data in JSON

    browser->>server: AJAX Request
    activate server
    server-->>browser: HTTP Status Code 201 Created
    deactivate server
    Note right of server: Send data in JSON format
    Note right of browser: Redraw the notes
```
