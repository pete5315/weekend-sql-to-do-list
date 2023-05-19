CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (400) NOT NULL,
	"author" VARCHAR (100) NOT NULL,
    "isComplete" BOOLEAN DEFAULT FALSE
);