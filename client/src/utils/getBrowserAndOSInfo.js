export const getBrowserAndOSInfo = () => {
  const userAgent = navigator.userAgent;

  let operatingSystem = userAgent.match(/Windows|Mac|Linux/)?.[0] || userAgent;
  operatingSystem += ' OS';

  let browser;
  let version;
  const browserMatch = userAgent.match(
    /(Chrome|Firefox|Safari|Edge|MSIE|Trident)\/?\s*(\d+)/
  );

  if (browserMatch) {
    browser = browserMatch[1];
    version = browserMatch[2];
    if (browser === 'MSIE' || browser === 'Trident') {
      browser = 'Internet Explorer';
      version = userAgent.match(/rv:(\d+)/)?.[1] || version;
    }
    browser += ` ${version}`;
  } else {
    browser = userAgent;
  }

  return {
    operatingSystem,
    browser,
  };
};
