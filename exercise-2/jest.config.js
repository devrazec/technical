module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react'],
        ],
      },
    ],
  },
};
