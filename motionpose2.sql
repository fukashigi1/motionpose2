-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2023 a las 00:30:21
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
  `id_compra` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `fecha_compra` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `id_imagen` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(20, 1, 'sexo_1699743479763.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `id_preferencias` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `autoguardado` tinyint(4) DEFAULT NULL,
  `temporizador` int(11) DEFAULT NULL,
  `formato_imagen` varchar(50) DEFAULT NULL,
  `hotkey_captura` varchar(150) DEFAULT NULL,
  `hotkey_captura_temp` varchar(150) DEFAULT NULL,
  `hotkey_exportar` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id_preferencias`, `id_proyecto`, `autoguardado`, `temporizador`, `formato_imagen`, `hotkey_captura`, `hotkey_captura_temp`, `hotkey_exportar`) VALUES
(1, 1, 1, 6, 'exportarJPEG', '[[\"SHIFT\", 16], [\"D\", 68]]', '[[\"T\", 84]]', '[[\"SHIFT\", 16], [\"E\", 69]]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `id_usuario`, `id_tipo`, `nombre`) VALUES
(1, 1, 1, 'sexo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_tipo`
--

CREATE TABLE `proyecto_tipo` (
  `id_tipo` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `id` int(11) NOT NULL,
  `id_sesion` varchar(255) NOT NULL,
  `data` text DEFAULT NULL,
  `fecha_expiracion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `id_usuario` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(150) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_tipo`, `nombre`, `correo`, `contrasena`, `estado`) VALUES
(1, 3, 'test', 'test@test.test', '$2b$12$2AVzwEJWkkPh.3/6wiN9w.JkZi7cxlElJD4BXTeTtlFGCmO/8nIiy', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_tipo`
--

CREATE TABLE `usuario_tipo` (
  `id_tipo` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id_preferencias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `proyecto_tipo`
--
ALTER TABLE `proyecto_tipo`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `FK_PROYECTO` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD CONSTRAINT `FK_PROYECTO_OPCIONES` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON UPDATE NO ACTION;

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
