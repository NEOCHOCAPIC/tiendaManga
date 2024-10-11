create database mangaStore
use mangaStore

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table mangas (

	id INT AUTO_INCREMENT PRIMARY KEY,
	portadaURL varchar(255),
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    anio_publicacion YEAR,
    sinopsis TEXT,
    numero_volumenes INT,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);
CREATE TABLE carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    manga_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (manga_id) REFERENCES mangas(id)
);

INSERT INTO mangas (portadaURL, titulo, autor, anio_publicacion, sinopsis, numero_volumenes, categoria, precio) VALUES
('https://preview.redd.it/cl9kr68u5ov91.jpg?auto=webp&s=c36140f75fc1cd2fc9f950acfa42dc5cfec0849f', 'One Piece', 'Eiichiro Oda', 1997, 'La historia sigue a Monkey D. Luffy y su tripulación en su búsqueda del tesoro supremo conocido como "One Piece".', 100, 'Aventura', 8.99),
('https://i5.walmartimages.com/seo/Hunter-X-Hunter-Hunter-x-Hunter-Vol-35-Series-35-Paperback-9781974703067_9e07817e-8e53-4e06-ba00-8b8a62edc9ed_1.14ba8811a45455b54760d033a8d2c925.jpeg', 'Hunter x Hunter', 'Yoshihiro Togashi', 1998, 'Gon Freecss se embarca en un viaje para convertirse en cazador y encontrar a su padre.', 36, 'Aventura', 9.99),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYdBt-2JSwL_WkH8Jsk2os2LXmHmHf_gGZwg&s', 'Jujutsu Kaisen', 'Gege Akutami', 2018, 'Yuji Itadori se une a la escuela de hechicería para combatir maldiciones y salvar a sus amigos.', 20, 'Sobrenatural', 7.49),
('https://i1.whakoom.com/large/1b/0d/b1ae1d7b973046068515c2b703a4c448.jpg', 'Spy x Family', 'Tatsuya Endo', 2019, 'Un espía debe crear una familia para cumplir una misión, sin saber que su hija es una telépata.', 11, 'Comedia', 6.99),
('https://i.pinimg.com/736x/38/70/68/387068433992eb465d81c1b5ec705116.jpg', 'My Hero Academia', 'Kohei Horikoshi', 2014, 'Izuku Midoriya, un chico sin poderes, aspira a convertirse en un héroe.', 35, 'Acción', 8.49),
('https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2020/08/Attack-on-Titan-Shingeki-no-Kyojin-Manga-Volumen-32.jpg?resize=1080%2C1616&ssl=1', 'Attack on Titan', 'Hajime Isayama', 2009, 'La humanidad lucha por sobrevivir contra gigantes devoradores de hombres llamados titanes.', 34, 'Acción', 9.99),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUswyvIjU_X3pNGEHFbQysFqMs13_137W2sQ&s', 'Demon Slayer: Kimetsu no Yaiba', 'Koyoharu Gotouge', 2016, 'Tanjiro Kamado busca vengar a su familia y salvar a su hermana de convertirse en demonio.', 23, 'Aventura', 7.99),
('https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/12/portada-volumen-31-tokyo-revengers.jpg?resize=1280%2C1914&ssl=1', 'Tokyo Revengers', 'Ken Wakui', 2017, 'Un hombre regresa en el tiempo para salvar a su novia y cambiar su destino.', 30, 'Drama', 8.99),
('https://i.pinimg.com/736x/5b/86/a5/5b86a5723a789cbd91b428ec9661a184.jpg', 'Fairy Tail', 'Hiro Mashima', 2006, 'Natsu Dragneel y su equipo de magos viajan para encontrar al dragón que lo crió.', 63, 'Aventura', 9.49),
('https://cdnx.jumpseller.com/shazam-online/image/15943807/deathnote06.jpg?1640316972', 'Death Note', 'Tsugumi Ohba', 2003, 'Un estudiante encuentra un cuaderno que le permite matar a cualquier persona cuyo nombre escriba en él.', 12, 'Psicológico', 10.99),
('https://akumetsumangastore.cl/wp-content/uploads/2022/04/portada_sword-art-online-progressive-novela-n-01-scaled.jpg', 'Sword Art Online', 'Reki Kawahara', 2009, 'Jugadores quedan atrapados en un juego de realidad virtual donde morir en el juego significa morir en la vida real.', 27, 'Aventura', 8.99),
('https://i.pinimg.com/474x/b3/18/0d/b3180d641d1ce858df32aef6b94599c4.jpg', 'Bleach', 'Tite Kubo', 2001, 'Ichigo Kurosaki, un shinigami, lucha contra espíritus malignos para proteger a los vivos.', 74, 'Acción', 8.49),
('https://images.cdn2.buscalibre.com/fit-in/360x360/1a/26/1a26bf690cb1971e644414899ad4ed7a.jpg', 'Naruto', 'Masashi Kishimoto', 1999, 'Naruto Uzumaki busca reconocimiento y aspira a convertirse en Hokage, el líder de su aldea.', 72, 'Aventura', 9.99),
('https://preview.redd.it/gwiifin2cpjc1.jpeg?auto=webp&s=76e54246c731eee8610883007d750b407d1a1e5c', 'One Punch Man', 'Yusuke Murata', 2012, 'Saitama, un héroe aburrido, busca un adversario digno mientras lucha contra villanos.', 23, 'Comedia', 7.99),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoreMzinYGHzhNdVRmZdERuppk9zclsVmGGw&s', 'Black Clover', 'Yūki Tabata', 2015, 'Asta, un joven sin magia, aspira a convertirse en el Rey Mago de su reino.', 32, 'Aventura', 8.49),
('https://hobbiegames.cl/cdn/shop/products/D_NQ_NP_860539-MLC49342583876_032022-O_355x.jpg?v=1665678711', 'Mob Psycho 100', 'ONE', 2012, 'Shigeo Kageyama, un chico con poderes psíquicos, trata de vivir una vida normal.', 16, 'Comedia', 9.49),
('https://pageone.cl/cdn/shop/products/Yona_Princesa_Del_Amanecer_01_-_Norma_ES_-_Manga_4c7b7e9f-8d58-4f27-9f8e-368ef3bb7716_1280x.jpg?v=1611196592', 'Yona of the Dawn', 'Mizuho Kusanagi', 2009, 'Yona, una princesa, busca recuperar su reino tras ser traicionada por su amor.', 45, 'Romance', 8.99),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcFx35QeAYYcnsdV_d_vsBcxvgg1rsrUf-w&s', 'Fruits Basket', 'Natsuki Takaya', 1998, 'Tohru Honda se encuentra con la familia Sohma, quienes están bajo una maldición.', 23, 'Romance', 7.49),
('https://i1.whakoom.com/large/18/1a/fcf8c6814b0545ce95ef0e1f344fcd4b.jpg', 'The Promised Neverland', 'Kaiu Shirai', 2016, 'Un grupo de huérfanos descubre un oscuro secreto sobre su hogar y planea escapar.', 20, 'Suspense', 8.99),
('https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_kct8oag8bp7f74lhb8k1eo0k5h/-S897-FWEBP', 'Assassination Classroom', 'Yūsei Matsui', 2012, 'Un ser extraño que se convierte en maestro de una clase de estudiantes problemáticos mientras planea destruir el mundo.', 21, 'Comedia', 9.49);
