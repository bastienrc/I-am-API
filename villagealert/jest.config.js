const config = {
  verbose: true,
  reporters: [
    'default',
    ['jest-html-reporters', {
      pageTitle: 'VillageAlert API > Test Report',
      publicPath: './html-report',
      filename: 'report.html',
      openReport: true
    }]
  ]
}

export default config
