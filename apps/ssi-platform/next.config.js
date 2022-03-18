// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/verification',
        destination: '/dashboard/verification/new',
        permanent: true,
      },
      {
        source: '/dashboard/issue',
        destination: '/dashboard/issue/new',
        permanent: true,
      },
      {
        source: '/dashboard/schema',
        destination: '/dashboard/schema/new',
        permanent: true,
      },
    ]
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

module.exports = withNx(nextConfig)
