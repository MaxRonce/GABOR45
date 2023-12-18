module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
};
