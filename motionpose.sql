-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-09-2023 a las 03:27:43
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `motionpose`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre_usuario` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `contrasena` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_usuario` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre_usuario`, `contrasena`, `correo`, `tipo_usuario`) VALUES
('123', '$2b$12$AapRS5dYRx9f.0R0Re7Lre2UTzOiN92MJk3QU56oyx6beyDN7Azh2', '123@gmail.com', 0),
('123', '$2b$12$qXbkZu/Mn6ZhYjBztTWszuOqVLdtUIPr/aqp2kzyr7rCf/nzQA2PC', '1234@gmail.com', 0),
('hola', '$2b$12$LKfI3kGwShNQaRzc0lKYEOmf88vGjLbMKPaipIW0aFBim.ZL2k5Uy', 'maatiaasbkn2@gmail.com', 0),
('hola', '$2b$12$.qUieb/BbTCntFohJHJYmO0jPsRJHqE9BKEEH5xw5dtpnrjg6phhu', 'maatiaasbkn3@gmail.com', 0),
('aaaa', '$2b$12$4TKtwrkI33HQjqjHSppvqukxQe4DNLIxrqqWs5Qa.ykTacuqzgDNC', 'maatiaasbkn4@gmail.com', 0),
('sexador', '$2b$12$dYq34QowNT6nexQq3fL8Mu9LWBptNJSpRDjnLJuxbJchUQs5wTLUG', 'sexador@gmail.com', 0),
('test1', '$2b$12$muphf2Xu/TYv5SU4a0obPOgKh/YsIgRWqp0Fdt1zqTufQ7X6cu6Bm', 'test1@gmail.com', 0),
('test10', '$2b$12$nncl9WMTyBe7xWi2.Wyq0u0rgP9Lt9Riq5ZUQ5KyivhUcx7/6d/w6', 'test10@gmail.com', 0),
('test11', '$2b$12$DnEBYHKwCGU2He4pwwOfyuP8qVG/AEwCjsKwH5NXcq45t50SQC8I2', 'test11@gmail.com', 0),
('test12', '$2b$12$2Wei9NgPBgAbDolVvjy.Xu6hXQZOYGDmho.JBsBounfGUzq7yOIfC', 'test12@gmail.com', 0),
('test13', '$2b$12$qvgIIX1/A5xIgyfi7Lybdejmu.qHghQZkq6ycDLTCBvIXP29Xcx9W', 'test13@gmail.com', 0),
('test2', '$2b$12$VDaTZ0tRmzImIyF0Sy6ty.io6OgbcjFIty2RN346y8ifRW4uvLAr2', 'test2@gmail.com', 0),
('test3', '$2b$12$LT5nJdCZzD7K2FILPcovDOhYWCNJpO3D19oFQJTsbVb05KHgjg22G', 'test3@gmail.com', 0),
('test4', '$2b$12$6IWtEMBJcfN70amDja6YjOxyQP/dAu4220uXbVN3PA1/BY0bdLqOO', 'test4@gmail.com', 0),
('test5', '$2b$12$Qad9q7ClA1pZVsFot7TcMOjTTdQZDhKOrdG6usaXWWs5HybQMfrde', 'test5@gmail.com', 0),
('test6', '$2b$12$IYWnhlr2sf3g2OFHPKnqqeW/8iupuGwufZBjF4.4lYJMYvA/SXm6a', 'test6@gmail.com', 0),
('test7', '$2b$12$xuFxNx5HHKqUXkGhgv8vzuwN3u.Or5GlCnA8xkL8jWuFhbt/.I9nG', 'test7@gmail.com', 0),
('test8', '$2b$12$7UEOj9Fi0vfiiq1E8UTvveeq8BGhVoy9QaW6QBXvs6LLCYrp9LxJC', 'test8@gmail.com', 0),
('test9', '$2b$12$I9wG0jtfTy0gxXCVcahEuOqvRSM5F/VJ65NV/XkFeejYKQv8ndpQm', 'test9@gmail.com', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

