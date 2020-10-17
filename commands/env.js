const fs = require('fs');
const MAPPING = require('./env_mappings.json');

const COMMENT_MARK = '#';
const ENV_DELIMITER_MARK = '=';

const EnvCommand = {
    title: "env",
    sourceFile: ".env.example",
    targetFile: ".env",
    run: function () {
        console.log('Start:');

        if (fs.existsSync(EnvCommand.targetFile)) {
            console.warn(`file ${EnvCommand.targetFile} is existed!`);
            return;
        }

        if (!fs.existsSync(EnvCommand.sourceFile)) {
            console.log(`file ${EnvCommand.sourceFile} not existed`);
            fs.writeFileSync(EnvCommand.targetFile, '');
            console.log(`${EnvCommand.targetFile} created`);
            console.log('Finish!');
            return;
        }

        const envFileContent = fs
            .readFileSync(EnvCommand.sourceFile, 'utf-8')
            .replace(/ /gm, '')
            .split(/\r\n|\r|\n/g)
            .map(line => {
                const splitResult = line.split(ENV_DELIMITER_MARK);

                const [variableName, variableValue] = splitResult.length > 2
                    ? [splitResult[0], splitResult.slice(1).join(ENV_DELIMITER_MARK)]
                    : splitResult;

                if (!variableName || variableName[0] === COMMENT_MARK) {
                    return line;
                }

                return MAPPING[variableName]
                    ? `${variableName}${ENV_DELIMITER_MARK}${MAPPING[variableName]}`
                    : `${variableName}${ENV_DELIMITER_MARK}${variableValue ?? ''}`;
            })
            .join("\n")

        fs.writeFileSync(EnvCommand.targetFile, envFileContent);

        console.log(`${EnvCommand.targetFile} created`);
        console.log('Finish!');
    },

}

module.exports = EnvCommand;
