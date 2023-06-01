CREATE TABLE "public.Users" (
	"id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.market_postings" (
	"id" serial NOT NULL,
	"condition" VARCHAR(255) NOT NULL,
	"price" FLOAT NOT NULL,
	"seller" integer NOT NULL,
	"cardId" integer NOT NULL,
	"sold" BOOLEAN NOT NULL DEFAULT FALSE,
	"buyer" integer DEFAULT NULL,
	CONSTRAINT "market_postings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cards" (
	"id" serial NOT NULL,
	"brand" VARCHAR(255) NOT NULL,
	"name" integer NOT NULL,
	"image" varchar NOT NULL,
	CONSTRAINT "cards_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "public.market_postings" ADD CONSTRAINT "market_postings_fk0" FOREIGN KEY ("seller") REFERENCES "public.Users"("id");
ALTER TABLE "public.market_postings" ADD CONSTRAINT "market_postings_fk1" FOREIGN KEY ("cardId") REFERENCES "public.cards"("id");
ALTER TABLE "public.market_postings" ADD CONSTRAINT "market_postings_fk2" FOREIGN KEY ("buyer") REFERENCES "public.Users"("id");

