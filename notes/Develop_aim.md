This program is developped to book the ticket in JR West Reservation service site e5489.
To book the tickets smoothly, we decide three aim:
- Sunrise express booking
  - The tampermonkey script, only used in booking sunrise express.
  - Auto booking request script, using the request, response scripts.
- Notification of ticket cancelling
  - Notification of cyberstation (jr-cyberstation)
  - Notification of JR-WEST e5489 booking service.
    - Loading the web page and get the seat state
    - Summarize the information and make a table.
    - If notification is on, notice when there is availible seat.
- Universal e5489 application
  - Login and book tickets
