-- Insert coffee menu data
INSERT INTO coffee_menu (name, description, price, category, image_url) VALUES
-- Espresso Category
('Classic Espresso', 'Rich, bold, and perfectly balanced single shot', 180, 'espresso', 'https://vinut.com.vn/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/12/how-to-make-a-macchiato-the-classic-way-6572e3d759e13.jpeg.webp'),
('Double Ristretto', 'Concentrated flavor with intense aroma', 220, 'espresso', 'https://blogstudio.s3.theshoppad.net/coffeeheroau/10897ed60052f2aa1a495aa1c02a8ce6.jpg'),
('Lungo', 'Extended extraction for a milder taste', 200, 'espresso', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80'),

-- Filter Category
('Pour Over', 'Hand-crafted single-cup brewing method for the perfect extraction', 250, 'filter', 'https://burnoutmugs.com/wp-content/uploads/2024/09/4.1-1024x682.jpg'),
('French Press', 'Full-bodied coffee with rich oils and bold flavor profile', 280, 'filter', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80'),
('AeroPress', 'Clean, smooth, and versatile brewing with precision control', 300, 'filter', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'),

-- Milk-Based Category
('Cappuccino', 'Perfect balance of espresso, steamed milk, and velvety foam', 320, 'milk', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'),
('Latte', 'Smooth espresso with velvety steamed milk and microfoam', 350, 'milk', 'https://cornercoffeestore.com/wp-content/uploads/2020/01/how-to-make-a-latte-at-home.jpg'),
('Flat White', 'Strong espresso with silky microfoam milk for intense flavor', 380, 'milk', 'https://images.arla.com/recordid/8763AA65-2EDD-4328-80C50FD4BB9B9EFE/picture.jpg?width=1200&height=630&mode=crop&format=jpg'),

-- Specialty Category
('Caramel Macchiato', 'Sweet caramel drizzle layered over rich espresso and steamed milk', 420, 'specialty', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80'),
('Mocha', 'Rich chocolate with premium espresso and velvety milk', 450, 'specialty', 'https://www.thespruceeats.com/thmb/POPhcPYBWx7fNJu8Bc7YjS-Flso=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg'),
('Vanilla Latte', 'Smooth vanilla with perfectly balanced espresso and milk', 400, 'specialty', 'https://cdn11.bigcommerce.com/s-5ljyj9oebs/products/6025/images/27336/P072023205410_1__56263.1709562034.386.513.jpg?c=2');
