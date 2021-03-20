-- db name: weekend-to-do-app --

CREATE TABLE "tasks"(
    "id" serial primary key,
    "newTask" varchar(100),
    "complete" boolean,
    "delete" boolean
);

INSERT INTO "tasks" ( "newTask", complete, delete ) 
VALUES 
    ( 'do the dishes', false, false ),
    ( 'do homework', false, false ),
    ( 'clean office space', false, false ),
    ( 'take dog on walk', false, false ),
    ( 'clean up yard', false, false ),
    ( 'grocery shopping', false, false ),
    ( 'target trip', false, false );

SELECT * FROM "tasks";