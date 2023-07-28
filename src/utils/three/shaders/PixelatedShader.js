// image to base64: https://www.base64-image.de/

import * as THREE from 'three';

const TEXTURE_SIZE = 64;

const _sources = {};
_sources['brick'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAEyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNjQiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iNjQiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI2NCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjY0IgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAg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';
_sources['cross'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iNjQiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI2NCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSI2NCIKICAgdGlmZjpJbWFnZVdpZHRoPSI2NCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0w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';
_sources['knit'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAVCAYAAAAnzezqAAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMyIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjEiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIzMiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjEiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDctMjBUMTM6NDM6NDEtMDc6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDctMjBUMTM6NDM6NDEtMDc6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjAuMCIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wNy0yMFQxMzo0Mzo0MS0wNzowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+z1WU1QAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHLS0JBFIc/tTDKKMhFiyAJa2VhBlGbICUqiBAz6LXR6ytQu9yrhLQN2goFUZtei/oLahu0DoKiCKJtrYvaVNzOVUGJPMOZ881v5hxmzoA1nFYyeoMXMtmcFpr0uxYWl1z2F+w46cBBd0TR1fFgcIa69nmPxYy3/Wat+uf+tZZYXFfA0iQ8pqhaTnhKeGY9p5q8I+xUUpGY8JmwR5MLCt+ZerTMryYny/xtshYOBcDaLuxK1nC0hpWUlhGWl+POpPNK5T7mSxzx7PycxB7xLnRCTOLHxTQTBBhmkFGZh+nHx4CsqJPvLeXPsia5iswqBTRWSZIih0fUvFSPS0yIHpeRpmD2/29f9cSQr1zd4YfGZ8N47wX7NvwUDePryDB+jsH2BJfZav7aIYx8iF6sau4DaNuE86uqFt2Fiy3ofFQjWqQk2cStiQS8nULrInTcQPNyuWeVfU4eILwhX3UNe/vQJ+fbVn4BPf5n0/P+XOAAAAAJcEhZcwAACxMAAAsTAQCanBgAAATeSURBVEiJbdZfiFxnGcfxz5kzO7O7szM7k50kLdldN7WhtTbZVIxYjTpNRWgvQsWCeNHaC2vBtjd60YtCe4SiIFhBK96IBK1I/4BYtdKaxgmhTVRijTFBEhoMNE2z/5r93/nvxZwTT5YdeDjnfc877+/7POd5n+cE4l8hqmVXRdWH+d09fCykmEeIDIJ4XRsNrONqPFfGEPLIxnM9dNGJ13doHePEj0RfKtFc7q8JQgiiWtBk/5D6HWfU3ppmb6W/Zy4R78WbtVLWjMUGUpAJqBigFYu/y+Uf83RH/cY11gNW0Q2DqBb02DHBD2/jYEv9lTfVzu/jjmGGESbi7ZQ1Y+ulABLRtPdteivM/Z5T/xX94nYOZbhpkROi+mqoNlXcyeO7eLBCa5LpOfU/nlabnWZXwEiXTHsDQCsFEKa8TsM28SFLZ5g9zA8m1L+6g90l9nVZuVqbOhuWa1NP3M4DVaojDOYxyfRZ9Sfm1fbczNYOQx2CzQC6Ke83iq+zfomZNzi0Krr8CR4fFtyQozTIbXN8PNxdm3p9gmqJYIgwTy5Lb5SdJ9VeuJFPDZHv9iGuE08AEvEEIBZvL3DlXxw/xssH1J8cY3KASth/baUeuzPj5MsEo4hteJTqFJ/fIsoe5aUFFpZYX8FaP6xJcl1LtEb8bAVL9Bb44Bznj/PkPtEjO/noKJVEp4xxZCoooZiyUUbLVL7Ao//k+CVOrTC7TreREu9sArHeh1ifZ/EsP8t59psH+Mwo24pki7FeCVuQKWFEP92HUYjHRSoT3PJZ0Vfe4KlVZlosdzaIJzmRGrdazF7gxFW/Xbjf8peL/fzKF1I6IzFEZhiD+od+6PoFYZHqPdwdiA68zbMtZpo0kvff3HAy2nTaXGnSOMFPa848NKlXGqE4nNJIrIBMPgZILJ8CKjC4hcq9PHZBdOUKrzeYb9JrxCFPilKcnAtt1t7khXHfnfyk9v4CY0MEg5vo5JHJIdfPStn4mkDEr6S8l8Fb+NZhXmz3o7CySQRWuyy+x6l/i77/iN63i2wfJje4iUYyzmT1C0l8NK5ZKhIDJar3MT0guvUIP2kz26KTOgnNLrNrnPwbP/86v9zKrUMUEm/TAJn4mtwL4pswRZhQxvRDWxl9lIcviv7+Dq82mG/Qa9JtMtdi8SjPVEVfu4v9cbG5JjyQEk1XzsxafJNAZFMQSScM+12rcgNjB3n6bV66xMlFVhZZWmXuMM98KPrcA9yVZSwkSJxKi6eb1gqdzEVWenFBy6RMamEcmWyOao0906KDr/K9y7z/ATP/4FdzouXv8FiVashA6PruuHHvHt7hQjhfm7ppL9vLlHIx5ca26v9/yoU0t/ORc+qnz6n94X2Oroje+wZPTTGepTwQe5/+jujF16Slz7D+Gw6Fi7Wpk9so38yncwSJ+EaLIxL0GCzQGWFPXc0aOx5Uf+hOdmYZGyCzmbep9qxJ9yjH3uK57DCXn+f5vdy/i4l2SjTtQSbeKMtAj227GdknGg/I3Ekh229iwcYvqEQ8Kdc9vMt/fs1zI5xOIM//mZeXaSdlNfmwSEKXPikhYYHiF6nezZYC+ThRr4tYLwWQ7LtE40+8iCNdGpk1MmXWXuOVv3IxabdpCBsgMvHzydg6qfl07mwMfRsnmD/CXyqsrhH+D1M7z2vbpWdSAAAAAElFTkSuQmCC';
_sources['tile'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMyIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzIiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIzMiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMzIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDctMjBUMTM6NDg6MzctMDc6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDctMjBUMTM6NDg6MzctMDc6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjAuMCIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wNy0yMFQxMzo0ODozNy0wNzowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+CBb9VgAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHLS0JBFIc/tTDKKMhFiyAJa2VhBlGbICUqiBAz6LXR6ytQu9yrhLQN2goFUZtei/oLahu0DoKiCKJtrYvaVNzOVUGJPMOZ881v5hxmzoA1nFYyeoMXMtmcFpr0uxYWl1z2F+w46cBBd0TR1fFgcIa69nmPxYy3/Wat+uf+tZZYXFfA0iQ8pqhaTnhKeGY9p5q8I+xUUpGY8JmwR5MLCt+ZerTMryYny/xtshYOBcDaLuxK1nC0hpWUlhGWl+POpPNK5T7mSxzx7PycxB7xLnRCTOLHxTQTBBhmkFGZh+nHx4CsqJPvLeXPsia5iswqBTRWSZIih0fUvFSPS0yIHpeRpmD2/29f9cSQr1zd4YfGZ8N47wX7NvwUDePryDB+jsH2BJfZav7aIYx8iF6sau4DaNuE86uqFt2Fiy3ofFQjWqQk2cStiQS8nULrInTcQPNyuWeVfU4eILwhX3UNe/vQJ+fbVn4BPf5n0/P+XOAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAJaSURBVEiJhZZBbhsxDEWfOEoMZNFNT9Ib5go9Ute9SLYFWhSJMWIXtuhPSkEFYyBLJP8nRVJq319fn+CEBs59NBjQoAGyHsN3f1tefIYP6M/wbf4JiZaV206/zS0VaGDQ4AWu8AP6FZ7gK/zZSSuGwmwpGxzQocEXeIMrdIMP+A1/wcSiTy7/dUKdvgF0OOAdGvTYtqxvk3WxvmIYDPHApq7NxRR6z8oxAmbMr8/JEJl10tWEZwzPsT7nfGRJ5XTmwAJ9y1qDozAuW8VLzQhNis4S3HKwiEKoWQZuWYxZRoCF2hCjJZrtk5+SKEiRkN3ztgZ9W65jKg/ZikgWvx9IbabXWI5EdYLEkMw2MeeZPnHIvuPeBGMF063b1zIYAn/3t3Bfa6rEUGtim7UpROvwHOg1Z1ZfQyAMdl90ioJOfCbolpMmZMxNaycmpQ+zbG1Hk8OIYaWSS0CADgZnTo9tJ/cdSwtD0T6PzDpMt50fisRM9PaJN7XKNRSRf2M5Ks39kbs30U3XTlvAhvhUwlicOMsZFC6qoI2+XKXbNIt2kM4AEXIxFxH03S7ZtJZLkTEEMHSK1y6TWI9eVCyonfvZFCtt97UlJg7nvOZW60gMHqyLv5bL6ph3eiFYriM15XqjMavcRCLqWR03gTThHk8KLZoexWXQwRv4A19fSgVVnQiKNh095uLdgwOebgpeW1OpybU5NimuY7664m7oDhd4ycmjZNvOqGXhGDZfdi/w63YGHd7hTZ495cx1lMVtud24X+ADnqG/w8/5fCcHl7yygrlolfY+4AJX+AddcvRRAxRgJAAAAABJRU5ErkJggg==';
_sources['woven'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFX2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iNjQiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI2NCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSI2NCIKICAgdGlmZjpJbWFnZVdpZHRoPSI2NCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAg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';

export const PixelatedShader = {
    name: 'Pixelated Shader',

    uniforms: {
        'resolution': { value: new THREE.Vector2() },
        'tDiffuse': { value: null },
        'tPixel': { value: null },
        'uCamera': { value: new THREE.Vector2() },
        'uCellSize': { value: new THREE.Vector2() },
        'uDiscard': { value: 0 },
    },

    vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,

    fragmentShader: /* glsl */`
        #include <common>

        uniform vec2 resolution;
        uniform sampler2D tDiffuse;
        uniform sampler2D tPixel;
        uniform vec2 uCamera;
        uniform vec2 uCellSize;
        uniform float uDiscard;

        varying vec2 vUv;

        void main() {
            vec2 cell = resolution / uCellSize;
            vec2 grid = 1.0 / cell;
            vec2 pixel = 1.0 / resolution;

            // Camera Offset
            vec2 fract = pixel * mod(uCamera, uCellSize);

            // Pattern Pixel
            //
            //  +1.0┏━━━━━━━━━━┓
            //      ┃       255┃        Blue Layer, Y Offset
            //      ┃     192  ┃
            //  +0.0┃   128    ┃
            //      ┃ 64       ┃
            //      ┃0         ┃        Green Layer, X Offset
            //  -1.0┗━━ +0.0 ━━┛+1.0
            //
            // NOTE: 128 != 255/2.0, so apply adjustment (i.e. 128 * 0.99609375 == 127.5)
            //
            vec2 patternUV = mod((vUv + fract) * cell, 1.0);
            vec4 pattern = texture2D(tPixel, patternUV);
            vec2 offset;
            float l = luminance(vec3(pattern.r));                           // r, grayscale
            offset.x = grid.x * ((pattern.g * 0.99609375 * 2.0) - 1.0);     // g, x offset
            offset.y = grid.y * ((pattern.b * 0.99609375 * 2.0) - 1.0);     // b, y offset

            // Image Pixel
            vec2 pixelUV = grid * (0.5 + floor((vUv + fract) / grid));
            pixelUV -= fract;
            pixelUV += offset;
            vec4 pixelized = texture2D(tDiffuse, pixelUV);

            // Too Dark?
            float darkness = luminance(pixelized.rgb);
            if (darkness < uDiscard) discard;

            gl_FragColor = vec4(l * pixelized.rgb * pattern.a, pattern.a);
        }`,

    createStyleTexture: function(style) {
            const canvas = document.createElement('canvas');
            canvas.width = TEXTURE_SIZE;
            canvas.height = TEXTURE_SIZE;

            // // DEBUG
            // canvas.style['background'] = '#ff0000';
            // canvas.style['position'] = 'absolute';
            // canvas.style['z-index'] = 2000;
            // document.body.appendChild(canvas);

            const texture = new THREE.CanvasTexture(
                canvas, undefined,
                THREE.RepeatWrapping,
                THREE.RepeatWrapping,
                THREE.NearestFilter,
                THREE.NearestFilter,
            );

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

            if (!_sources[style]) {
                ctx.fillStyle = '#ff8080';
                ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
                texture.needsUpdate = true;

            } else {
                const image = document.createElement('img');
                image.onload = () => {
                    ctx.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
                    ctx.drawImage(image, 0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
                    texture.needsUpdate = true;
                };
                image.src = _sources[style];
            }

            return texture;
        }

};
