const { notarize } = require('@electron/notarize');
const path = require('path');
const { execSync } = require('child_process');

exports.default = async function notarizeApp(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') return;


  const appDir = context.appDir; // Electron 应用源码目录
  const appName = context.packager.appInfo.productFilename; // 主应用名
  const appPath = path.join(context.appOutDir || appDir, `${appName}.app`);

  // 签名信息
  // -------------------------------
  // 1. 签名子进程 (xmrig)
  // -------------------------------
  // const CODESIGN_IDENTITY = 'Developer ID Application: Chainnet Technology (Hangzhou) Company Limited (H6XKR479R6)';
  // const ENTITLEMENTS = path.resolve('build/entitlements.mac.plist');
  // // 子进程路径
  // const subprocessPath = path.join(appPath, 'Contents', 'Resources', 'xmrig', 'xmrig');
  // console.log(`Signing subprocess: ${subprocessPath}`);
  // try {
  //   execSync(
  //     `codesign --sign "${CODESIGN_IDENTITY}" --options runtime --entitlements "${ENTITLEMENTS}" --timestamp "${subprocessPath}"`,
  //     { stdio: 'inherit' }
  //   );
  //   console.log('Subprocess signed successfully.');
  // } catch (err) {
  //   console.error('Failed to sign subprocess:', err);
  //   process.exit(1);
  // }


  // -------------------------------
  // 2. Notarization
  // -------------------------------
  console.log('Starting notarization...');
  await notarize({
    appBundleId: 'com.chainnet.nonceminer',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
    teamId: process.env.APPLE_TEAM_ID,
  });
};
