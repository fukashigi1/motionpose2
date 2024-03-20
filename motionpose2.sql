-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 27-11-2023 a las 16:24:21
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
-- Base de datos: `motionpose2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id_compra` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `fecha_compra` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id_compra`, `id_usuario`, `id_producto`, `fecha_compra`) VALUES
(3, 1, 2, '2023-11-10 01:43:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_imagen` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `nombre` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagen`, `id_proyecto`, `nombre`) VALUES
(1, 1, 'sexo_1699584370232.png'),
(2, 1, 'sexo_1699743317875.png'),
(3, 1, 'sexo_1699743317676.png'),
(4, 1, 'sexo_1699743316587.png'),
(5, 1, 'sexo_1699743316339.png'),
(6, 1, 'sexo_1699743316026.png'),
(7, 1, 'sexo_1699743315835.png'),
(8, 1, 'sexo_1699743315643.png'),
(9, 1, 'sexo_1699743315439.png'),
(10, 1, 'sexo_1699743315243.png'),
(11, 1, 'sexo_1699743315038.png'),
(12, 1, 'sexo_1699743314475.png'),
(13, 1, 'sexo_1699743469163.png'),
(14, 1, 'sexo_1699743468971.png'),
(15, 1, 'sexo_1699743468763.png'),
(16, 1, 'sexo_1699743468547.png'),
(17, 1, 'sexo_1699743468339.png'),
(18, 1, 'sexo_1699743468131.png'),
(19, 1, 'sexo_1699743479991.png'),
(20, 1, 'sexo_1699743479763.png'),
(21, 3, 'test_1701099920615.png'),
(22, 3, 'test_1701099920420.png'),
(23, 3, 'test_1701099920108.png'),
(24, 3, 'test_1701099920615.png'),
(25, 3, 'test_1701099920420.png'),
(26, 3, 'test_1701099920108.png'),
(27, 3, 'test_1701099925662.png'),
(28, 3, 'test_1701099920615.png'),
(29, 3, 'test_1701099920420.png'),
(30, 3, 'test_1701099920108.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `id_preferencias` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `autoguardado` tinyint DEFAULT '0',
  `temporizador` int DEFAULT '5',
  `formato_imagen` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '0',
  `hotkey_captura` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[["S", 83]]',
  `hotkey_captura_temp` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[["T", 84]]',
  `hotkey_exportar` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[["E", 69]]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id_preferencias`, `id_proyecto`, `autoguardado`, `temporizador`, `formato_imagen`, `hotkey_captura`, `hotkey_captura_temp`, `hotkey_exportar`) VALUES
(1, 1, 1, 6, 'exportarJPEG', '[[\"S\", 83]]', '[[\"T\", 84]]', '[[\"E\", 69]]'),
(3, 3, 0, 9, '0', '[[\"S\", 83]]', '[[\"T\", 84]]', '[[\"E\", 69]]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_tipo` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `id_usuario`, `id_tipo`, `nombre`) VALUES
(1, 1, 1, 'sexo'),
(3, 2, 1, 'test');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_tipo`
--

CREATE TABLE `proyecto_tipo` (
  `id_tipo` int NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `proyecto_tipo`
--

INSERT INTO `proyecto_tipo` (`id_tipo`, `tipo`) VALUES
(1, 'Imagen'),
(2, 'Video'),
(3, '3D'),
(4, 'Animación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int NOT NULL,
  `id_sesion` varchar(255) NOT NULL,
  `data` text,
  `fecha_expiracion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_producto` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_producto`, `nombre`, `precio`) VALUES
(1, 'VIP', 5000),
(2, 'SUPER VIP', 9000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `id_tipo` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(150) DEFAULT NULL,
  `estado` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_tipo`, `nombre`, `correo`, `contrasena`, `estado`) VALUES
(1, 3, 'test', 'test@test.test', '$2b$12$2AVzwEJWkkPh.3/6wiN9w.JkZi7cxlElJD4BXTeTtlFGCmO/8nIiy', 1),
(2, 1, 'qweqw', 'caca@caca.com', '$2b$12$z8sBKfucciIO9FV8k6Z0gOu8IC4nKy4ygtjeg16BWpTVNX1mVirom', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_tipo`
--

CREATE TABLE `usuario_tipo` (
  `id_tipo` int NOT NULL,
  `tipo` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuario_tipo`
--

INSERT INTO `usuario_tipo` (`id_tipo`, `tipo`) VALUES
(1, 'Usuario'),
(2, 'VIP'),
(3, 'SUPER VIP'),
(4, 'Admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `FK_USUARIO` (`id_usuario`),
  ADD KEY `FK_PRODUCTO` (`id_producto`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `FK_PROYECTO` (`id_proyecto`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`id_preferencias`) USING BTREE,
  ADD KEY `FK_PROYECTO_OPCIONES` (`id_proyecto`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `FK_USUARIO` (`id_usuario`),
  ADD KEY `FK_TIPO_PROYECTO` (`id_tipo`);

--
-- Indices de la tabla `proyecto_tipo`
--
ALTER TABLE `proyecto_tipo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `FK_TIPO` (`id_tipo`);

--
-- Indices de la tabla `usuario_tipo`
--
ALTER TABLE `usuario_tipo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_imagen` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id_preferencias` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proyecto_tipo`
--
ALTER TABLE `proyecto_tipo`
  MODIFY `id_tipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `FK_PRODUCTO` FOREIGN KEY (`id_producto`) REFERENCES `tienda` (`id_producto`),
  ADD CONSTRAINT `FK_USUARIO_COMPRA` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `FK_PROYECTO` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD CONSTRAINT `FK_PROYECTO_OPCIONES` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `FK_TIPO_PROYECTO` FOREIGN KEY (`id_tipo`) REFERENCES `proyecto_tipo` (`id_tipo`),
  ADD CONSTRAINT `FK_USUARIO_PROYECTO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_TIPO` FOREIGN KEY (`id_tipo`) REFERENCES `usuario_tipo` (`id_tipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
