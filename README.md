# Dualform static site

## Desarrollo local

Para probar las rutas con el mismo comportamiento esperado en Vercel, sirve el proyecto desde la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Luego abre:

```text
http://localhost:8080/
```

Evita abrir `index.html` con doble clic para validar navegación, porque las rutas absolutas de producción como `/contacto/` pueden resolverse contra la raíz del sistema de archivos en modo `file://`.
