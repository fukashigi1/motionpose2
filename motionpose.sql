-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-10-2023 a las 00:56:22
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
(1, 'test@gmail.com', 1, '2023-10-03 21:54:49');

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
(36, 'a', 'video', 'test@gmail.com');

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
('test@gmail.com', '$2b$12$7ANAG8QoWrgWCIXwfrnK1uqvrk4ItT9tV.VypBbCGm2U0J4cUHhL.', 'test@gmail.com', 'VIP');

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
  MODIFY `id_compra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
