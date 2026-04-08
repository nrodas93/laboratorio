// ==UserScript==
// @name        New script animeflv.net
// @namespace   Violentmonkey Scripts
// @match       https://www4.animeflv.net/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzElEQVQ4T2P8//8/o6GhocqfP386GBgYXICYD4jxgU9AyT0sLCwV58+fv8Oop6enDjTkBBALENCIIs3IyPgBiC0YdXR01gJlgkjRjKR2HciAj0Q4G5f5X0AG/EeWnTt3LoOZmRnDvn37GPLz8xn8DH4xtEbcwjBg6RFFho4t3AwYBpw7dw6s+Nu3bwzBwcEMFuKPGVpCbzFceyLCcOERD9yga0/ZGDZeYkM1ICIiAmzr2bNnGYyNjRnmzZvH8PLoVIZW/1sMy07LM7Tv4cVwCYoLWlpawBoLCgoYZs6cyQByzcEZOQwtnrcY3nzlYXj1hQNswN23XAxVuyGxjWLAunXrGB4/fsywceNGhuTkZAYhISGGheVBDNVmZxjefuNmePWVE2LAO06GysNoBhgZGTHU1NRgOPHCqkkMoYxTGJZfV2Bou4AIA5hCuAsyMjIY7OzsGKZNmwaW4+HhYYiLi2P4cGoHg+39coblt+UY2q7hCYP+/n6GZ8+eMXR3d8NdUV9fz2DI/ZdBeW8kw7J7sgzttzFTOVUSEmVJGRh4mr9//z5GTmZiZWW1YgRlZ319fbV///61AT3vBgo/AhnrC1B+FxMTU9XFixdvAQAll6/lGZJdywAAAABJRU5ErkJggg==
// @grant       none
// @version     1.0
// @author      -
// @description 31/3/2026, 6:36:20 p. m.
// ==/UserScript==

(function () {
    'use strict';
    document.addEventListener('keydown', function (e) {
        if (e.key === "MediaTrackPrevious" || e.key === "MediaTrackNext") {
            e.preventDefault();
            var idbtn = null;
            const contenedor = document.querySelector('div.CapNv');
            if (!contenedor) {
                return;
            }
            // Next track
            if (e.key === "MediaTrackPrevious") {
                idbtn = 'a.CapNvPv';
            }
            // Previous track
            if (e.key === "MediaTrackNext") {
                idbtn = 'a.CapNvNx';
            }
            if (idbtn) {
                contenedor?.querySelector(idbtn)?.click();
            }
        }

    });
})();