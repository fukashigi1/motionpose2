-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-10-2023 a las 01:34:31
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
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compra` int NOT NULL,
  `correo` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_producto` int NOT NULL,
  `fecha_compra` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id_compra`, `correo`, `id_producto`, `fecha_compra`) VALUES
(1, 'test@gmail.com', 1, '2023-10-03 21:54:49'),
(2, 'test@gmail.com', 2, '2023-10-04 20:17:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `data_proyecto_imagen`
--

CREATE TABLE `data_proyecto_imagen` (
  `id_data_proyecto` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `id_imagen` int NOT NULL,
  `id_opciones` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_imagen` int NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `nombre_imagen` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagen`, `correo`, `nombre_imagen`) VALUES
(1, 'test@gmail.com', '123_1698538390967.png'),
(2, 'test@gmail.com', '123_1698538390585.png'),
(3, 'test@gmail.com', '123_1698538865235.png'),
(4, 'test@gmail.com', '123_1698539197184.png'),
(5, 'test@gmail.com', '123_1698539218423.png'),
(6, 'test@gmail.com', '123_1698539218281.png'),
(7, 'test@gmail.com', '123_1698539749790.png'),
(8, 'test@gmail.com', '123_1698539952119.png'),
(9, 'test@gmail.com', '123_1698539951909.png'),
(10, 'test@gmail.com', '123_1698539951737.png'),
(11, 'test@gmail.com', '123_1698539951568.png'),
(12, 'test@gmail.com', '123_1698539951418.png'),
(13, 'test@gmail.com', '123_1698539951259.png'),
(14, 'test@gmail.com', '123_1698539961895.png'),
(78, 'test@gmail.com', '123_1698542397967.png'),
(79, 'test@gmail.com', '123_1698542432786.png'),
(80, 'test@gmail.com', '123_1698542452488.png'),
(81, 'test@gmail.com', '123_1698542494359.png'),
(82, 'test@gmail.com', '123_1698542593904.png'),
(83, 'test@gmail.com', '123_1698542962339.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `id_opciones` int NOT NULL,
  `correo` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`id_opciones`, `correo`) VALUES
(1, 'test@gmail.com'),
(2, 'test@gmail.com'),
(3, 'test@gmail.com'),
(4, 'test@gmail.com'),
(5, 'test@gmail.com'),
(6, 'test@gmail.com'),
(7, 'test@gmail.com'),
(8, 'test@gmail.com'),
(9, 'test@gmail.com'),
(10, 'test@gmail.com'),
(11, 'test@gmail.com'),
(12, 'test@gmail.com'),
(13, 'test@gmail.com'),
(14, 'test@gmail.com'),
(15, 'test@gmail.com'),
(16, 'test@gmail.com'),
(17, 'test@gmail.com'),
(18, 'test@gmail.com'),
(19, 'test@gmail.com'),
(20, 'test@gmail.com'),
(21, 'test@gmail.com'),
(22, 'test@gmail.com'),
(23, 'test@gmail.com'),
(24, 'test@gmail.com'),
(25, 'test@gmail.com'),
(26, 'test@gmail.com'),
(27, 'test@gmail.com'),
(28, 'test@gmail.com'),
(29, 'test@gmail.com'),
(30, 'test@gmail.com'),
(31, 'test@gmail.com'),
(32, 'test@gmail.com'),
(33, 'test@gmail.com'),
(34, 'test@gmail.com'),
(35, 'test@gmail.com'),
(36, 'test@gmail.com'),
(37, 'test@gmail.com'),
(38, 'test@gmail.com'),
(39, 'test@gmail.com'),
(40, 'test@gmail.com'),
(41, 'test@gmail.com'),
(42, 'test@gmail.com'),
(43, 'test@gmail.com'),
(44, 'test@gmail.com'),
(45, 'test@gmail.com'),
(46, 'test@gmail.com'),
(47, 'test@gmail.com'),
(48, 'test@gmail.com'),
(49, 'test@gmail.com'),
(50, 'test@gmail.com'),
(51, 'test@gmail.com'),
(52, 'test@gmail.com'),
(53, 'test@gmail.com'),
(54, 'test@gmail.com'),
(55, 'test@gmail.com'),
(56, 'test@gmail.com'),
(57, 'test@gmail.com'),
(58, 'test@gmail.com'),
(59, 'test@gmail.com'),
(60, 'test@gmail.com'),
(61, 'test@gmail.com'),
(62, 'test@gmail.com'),
(63, 'test@gmail.com'),
(64, 'test@gmail.com'),
(65, 'test@gmail.com'),
(66, 'test@gmail.com'),
(67, 'test@gmail.com'),
(68, 'test@gmail.com'),
(69, 'test@gmail.com'),
(70, 'test@gmail.com'),
(71, 'test@gmail.com'),
(72, 'test@gmail.com'),
(73, 'test@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id_proyecto` int NOT NULL,
  `nombre_proyecto` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_proyecto` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id_proyecto`, `nombre_proyecto`, `tipo_proyecto`, `correo`) VALUES
(12, 'mierda seca', '3d', 'maatiaasbkn2@gmail.com'),
(13, 'esrfwasdfsad', 'video', 'maatiaasbkn2@gmail.com'),
(52, 'asd', 'imagen', 'test@test.test'),
(53, '123', 'imagen', 'test@gmail.com'),
(54, '123', 'imagen', 'test@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_producto` int NOT NULL,
  `nombre_producto` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `precio` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_producto`, `nombre_producto`, `precio`) VALUES
(1, 'VIP', 5000),
(2, 'SUPER VIP', 9000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre_usuario` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `contrasena` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_usuario` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT 'GRATIS'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre_usuario`, `contrasena`, `correo`, `tipo_usuario`) VALUES
('mierdaseca', '$2b$12$08FPywPa/U4v36X5gavlZOFIhlaD/uFYUKPnlejLT7s05UynyN/D2', 'maatiaasbkn2@gmail.com', 'VIP'),
('USUARIO', '$2b$12$36Z65M3klMPhXB00hIKHtujGHbMu8L3.FoVFOvRzZp9f4Udhx64.q', 'MAATIAASBKN4@GMAIL.COM', 'GRATIS'),
('123', '$2b$12$e8KONbIhJ7RbwDY4/eKJy.IWG4W8JW7VK/GHbk.tEah0l9HW3wTBe', 'maatiasbkn3@gmail.com', 'GRATIS'),
('usuario', '$2b$12$Wi2hUr6Eeles1ypcGu2e8e95cm.2xvuZgrgXZHjPnnYWXs4ByMA6K', 'mierda@gmail.com', 'VIP'),
('fukashigi', '$2b$12$7ANAG8QoWrgWCIXwfrnK1uqvrk4ItT9tV.VypBbCGm2U0J4cUHhL.', 'test@gmail.com', 'VIP'),
('test', '$2b$12$jrCFgSXuy/Cc5E/r/R52DuVI7k.kQDhMI7ejcrw9vmqvdTXEAK5S6', 'test@test.test', 'GRATIS');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `correo` (`correo`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `data_proyecto_imagen`
--
ALTER TABLE `data_proyecto_imagen`
  ADD PRIMARY KEY (`id_data_proyecto`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `id_imagen` (`id_imagen`),
  ADD KEY `fk_dpi_opc` (`id_opciones`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `correo` (`correo`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id_opciones`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `correo` (`correo`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `data_proyecto_imagen`
--
ALTER TABLE `data_proyecto_imagen`
  MODIFY `id_data_proyecto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_imagen` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id_opciones` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`),
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `tienda` (`id_producto`);

--
-- Filtros para la tabla `data_proyecto_imagen`
--
ALTER TABLE `data_proyecto_imagen`
  ADD CONSTRAINT `data_proyecto_imagen_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `data_proyecto_imagen_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagenes` (`id_imagen`),
  ADD CONSTRAINT `fk_dpi_opc` FOREIGN KEY (`id_opciones`) REFERENCES `opciones` (`id_opciones`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`);

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
