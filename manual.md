next.js 웹 응용프로그램이 다국어를 지원하기 위해 next-i18next 를 사용하는 예제에 대한 설명입니다.

baseURL 하위 경로를 사용해서 언어별 라우트가 구현됩니다.

```plaintext
http://myapp.com     <- 기본 언어
http://myapp.com/en  <- 영어
http://myapp.com/ru  <- 러시아어
```

## 의존 패키지

관련 의존 패키지는 아래와 같습니다.

* next 12.0.4
* next-i18next 9,1.0
* react 17.0.2
* react-dom 17.0.2

```bash
$ npm install --save react react-dom next next-i18next 
```

```bash
$ npm install --save-dev typescript @types/react @types/react-dom
```

## 구성 파일

프로젝트 루트 디렉터리에 `next.config.js`, `next-i18next.config.js` 파일을 추가합니다.

> `next.config.js` 파일과 `next-i18next.config.js` 파일은 프로젝트 루트에서 작성되어야 하고, **파일이름**은 **지정된 이름**을 사용해야 진행에 문제가 발생하지 않습니다.

### next-i18next.config.js 파일

자세한 내용은 [GitHub: next-i18next](https://github.com/isaachinman/next-i18next) 저장소에서 찾으실 수 있습니다.

```js
const config = {
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en', 'ru'],
        defaultNS: 'common',
        localeDetection: false,
    },
};

module.exports = config;
```

`defaultLocale` 은 언어 경로를 포함하지 않는 언어를 지정합니다.
`locales` 는 지원하는 언어를 모두 작성합니다.
`defaultNS` 는 번역 파일의 파일이름을 작성합니다. (기본값은 common 입니다.)
`localeDetection` 은 웹서버에 요청시 요청 헤더의 accept-language 를 사용해서 언어를 지정할지를 결정합니다. (false 로 지정되는 경우 accept-language 값을 무시합니다.)


### next.config.js 파일

자세한 내용은 [next.js Internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing#limits-for-the-i18n-config) 페이지에서 찾으실 수 있습니다.

```js
const { i18n } = require('./next-i18next.config');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    i18n,
};

module.exports = nextConfig;
```

`next-i18next.config.js` 파일에서 작성한 구성을 `next.config.js` 파일에서 next config의 i18n 속성으로 사용합니다.

## 번역 파일

프로젝트 루트에 public 디렉터리를 작성합니다.
public 디렉터리에 locales 디렉터리를 작성합니다.
locales 디렉터리에 언어별 디렉터리를 작성합니다.
locales 디렉터리의 언어별 디렉터리에 common.json 파일을 작성합니다.

> locales 디렉터리의 언어별 디렉터리의 이름은 next-i18next.config.js 파일의 locales 에 입력되는 문자열 배열의 항목들의 이름으로 디렉터리 이름을 결정합니다.


```plaintext
├───public
│   └───locales
│       ├───en
│       ├───ko
│       └───ru
```

common.json 파일의 내용은 아래와 같이 유효한 json 형식으로 작성합니다.

```json
{
    "global": {
        "title": "next-i18next 예제"
    },
    "index": {
        "title": "안녕하세요! 👋"
    },
    "about": {
        "title": "소개합니다! 😊 "
    },
    "debug": {
        "title": "디버그"
    },
    "navigator": {
        "link": "Link 컴포넌트 사용",
        "router": "Router 사용"
    }
}
```

번역파일의 내용을 사용할 때는 아래와 같이 작성합니다.

```tsx
import { useTranslation } from 'next-i18next'

const Compo = () => {
    const { i18n, t } = useTranslation('common');
   
	return (
		<div>
		    <p>{t('global.title')}</p> {/* 한국어인 경우 "next-i18next 예제" 출력 */}
		</div>
	);
};
```

## 확인

이렇게 구성한 후 연결되는 경우 next.js 의 기능이 i18n 과 연동되어 동작합니다.

확인된 기능은 아래와 같습니다.

next.js의 아래 두 기능은 locale 을 지정하지 않으면, 현재 i18n.language 값을 locale 로 지정되어 동작합니다. 

* Link 컴포넌트 `next/link` 
* Router `next/router`

### next/link

Anchor 는 locale 을 지정하지 않으면 현재 i18n.language 의 값을 사용합니다.

```tsx
// import Link from 'next/link';

<Link href={href}>
	<a>
		{label}
	</a>
</Link>
```

### next/router

router 는 locale 을 지정하지 않으면 i18n.language 값을 사용합니다.

```tsx
import React from 'react'
import { useRouter } from 'next/router'

const Compo = () => {
	const router = useRouter()
	const handleClick = () => {
		router.push('/somepath');
	}
	return (
		<button onClick={handleClick}>{label}</button>
	);
};
```


### Change language

사용자가 언어를 변경하는 기능을 지원하려면 아래와 유사하게 `i18n.changeLanguage()` 를 사용합니다.

```typescript
i18n.changeLanguage(languageCode, () => {
	const { pathname, query, asPath } = router;
	// 값 확인용 콘솔 출력
	console.group('i18n.changeLanguage -> callback');
	console.info('language', languageCode);
	console.info(
		'pathname, query, asPath',
		pathname,
		query,
		asPath,
	);
	console.groupEnd();
	router.push({ pathname, query }, asPath, {
		locale: languageCode,
	});
});
```

> i18n.changeLanguage() 실행 위치를 주의해야 합니다.
>
> 예를 들어 _app.tsx 에 위 코드를 사용할 때, i18n.changeLanguage() 실행 후 i18n.language 의 변경이 자식 컴포넌트에서 정확하게 처리되는지 확인해야 합니다.
> 
> _app.tsx 에서 사용하는 것보다 자식 컴포넌트에서 사용하는 것이 더 좋다고 생각됩니다.
> 이 경우 문제없이 동작하는 것으로 확인되었습니다.

## 시연

[sample-next-i18next.vercel.app](https://sample-next-i18next.vercel.app/) 페이지에서 동작을 확인할 수 있습니다.


## 참조

[GitHub: sample-next-i18next](https://github.com/bbonkr/sample-next-i18next) 저장소에서 코드를 확인할 수 있습니다.

* [next.js](https://nextjs.org/docs/getting-started)
* [next-i18next](https://github.com/isaachinman/next-i18next)
* [react-i18next](https://react.i18next.com/)
* [GitHub: sample-next-i18next](https://github.com/bbonkr/sample-next-i18next)