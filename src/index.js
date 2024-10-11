import app from './app.js';
import { PORT } from './config/variableEntorno.js'

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto localhost:${PORT}`);
})

