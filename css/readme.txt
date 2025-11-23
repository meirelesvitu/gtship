# Como usar os *image slots*
- Procure por elementos `<figure class="media-slot" data-slot="...">` no HTML.
- Troque **apenas** o `src` do `<img>` pela sua imagem (JPG/PNG/WebP/SVG).
- Ajuste a proporção com `style="--ratio: 21/9"` (ex.: `16/9`, `4/3`, `1/1`).

Exemplo:
```html
<figure class="media-slot" data-slot="home-banner" style="--ratio: 21/9">
  <img src="assets/img/meu-banner.webp" alt="Banner do projeto X">
</figure>
```
