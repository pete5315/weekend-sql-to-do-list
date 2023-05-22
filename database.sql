--table creation code for Postico
CREATE TABLE "weekend-to-do-app" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (400) NOT NULL,
	"author" VARCHAR (100) NOT NULL,
    "isComplete" BOOLEAN DEFAULT FALSE
);

ALTER TABLE "weekend-to-do-app" ADD COLUMN "timeCompleted" DATE;