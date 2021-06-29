# A live streaming web application built for coders.


## TODOS:

- [] Frontend
    - [] show all live channels
    - [] a page just for a specific channel
- [] Backend
    - [] functionality to fetch live streaming data from obs or any other streaming software
    - [] figure out what kind of database to use (`postgresql` | mongodb)
     - [] what kind of models do you need to create
        - user
            - username
            - email
            - password
            - streamkey
        - stream
            - title
            - tags
     - [] do i need to store the live stream? (for now, nope)
    - [] create user authentication functionality
        - [] create passport local strategy

## Command to broadcast using ffmpeg
ffmpeg -r 30 -f lavfi -i testsrc -vf scale=1280:960 -vcodec libx264 -profile:v baseline -pix_fmt yuv420p -f flv rtmp://localhost:1935/live/