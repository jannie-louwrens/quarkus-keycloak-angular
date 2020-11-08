INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES (1, 'Bakery');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES (2, 'Dairy');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES (3, 'Butchery');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES (4, 'Fruit & Vegetables');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES (5, 'Household');

INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (1, 'Ciabatta Rolls', 'These sandwich rolls are at once incredibly flavorful and exceedingly light.', {ts '2018-12-21'}, 4.25, 1);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (2, 'Pumpkin Pie', 'A secret blend of traditional spices and combine them with sweet and spicy pumpkin custard.', {ts '2018-12-21'}, 45.99, 1);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (3, 'Milk', 'Refreshing and delicious, milk is ready for your crunchy cereal and morning coffee.', {ts '2018-12-21'}, 24.50, 2);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (4, 'Ground Beef', 'Raised without antibiotics and full of flavor, this beef is the base of big, juicy burgers, savory meat loaf and rich Bolognese sauce.', {ts '2018-12-21'}, 100.50, 3);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (5, 'Loin Chops', 'Flown in from the sheep-rich plains of Australia, these flavorful, juicy chops are ready to be barbecue.', {ts '2018-12-21'}, 76.50, 3);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (6, 'Brocolli', 'A hearty and tasty vegetable which is rich in dozens of nutrients.', {ts '2018-12-21'}, 11.25, 4);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (7, 'Water melon', 'All the sweetness, crunch, and knockout juiciness of the classic summertime melon.', {ts '2018-12-21'}, 89.90, 4);
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID)
VALUES (8, 'Potato', 'Starchy with low moisture content, perfect for baked potatoes or french fries.', {ts '2018-12-21'}, 29.99, 4);

INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE)
VALUES (1, 'spacehunter', 'Ciabatta Rolls', 'Bakery', {ts '2018-12-21'}, 6, 4.25);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE)
VALUES (2, 'spacehunter', 'Ground Beef', 'Butchery', {ts '2018-12-21'}, 1, 100.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE)
VALUES (3, 'mythbuster', 'Loin Chops', 'Butchery', {ts '2018-12-21'}, 2, 76.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE)
VALUES (4, 'grilldad', 'Milk', 'Dairy', {ts '2018-12-21'}, 2, 24.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE)
VALUES (5, 'grilldad', 'Ground Beef', 'Butchery', {ts '2018-12-21'}, 1, 100.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE)
VALUES (6, 'grilldad', 'Potato', 'Fruit & Vegetables', {ts '2018-12-21'}, 1, 29.99);
