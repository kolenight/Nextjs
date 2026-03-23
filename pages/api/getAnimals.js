import fs from 'fs'
import path from 'path'

export default (req, res) => {
    try {
        const filePath = path.join(process.cwd(), 'public', 'animals.json');
        const fileContent = fs.readFileSync(filePath);
        res.status(200).send(fileContent);
    }
    catch (e) {
        res.status(200).send("[]");
    }
};
