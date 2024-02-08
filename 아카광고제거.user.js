// ==UserScript==
// @name        아카광고제거
// @match       https://*.criteo.net/*
// @match       https://*.about.co.kr/*
// @match       https://*.iacstatic.co.kr/*
// @match       https://*.adop.cc/*
// @match       https://*.adnxs.com/*
// @match       https://*.g.doubleclick.net/*
// @match       https://*.bidr.io/*
// @match       https://*.vntsm.com/*
// @match       https://arca.live/*
// @grant       none
// @version     1.15
// @author      PantaFive
// @homepageURL https://github.com/panta5/arca-live-ad
// @downloadURL https://github.com/panta5/arca-live-ad/raw/main/%EC%95%84%EC%B9%B4%EA%B4%91%EA%B3%A0%EC%A0%9C%EA%B1%B0.user.js
// @description 사이드바 광고 없애기. 적자? 알빠노? (유저광고 제외)
// ==/UserScript==

// 최종수정일: 2024-Feb-08 14:24 KST

const hasIframe = (e) => {
    if (e?.tagName.toLowerCase() === 'iframe') {
        return true;
    }
    let children = e?.children;
    for (let i = 0; i < children?.length; i++) {
        if (hasIframe(children[i])) {
            return true;
        }
    }
    return false;
};

const isSponsored = () => {
    if (document.querySelectorAll('a.a-badge.sponsored')?.length > 0) return true;
    else return false;
};

window.location.href.includes('criteo.net') ||
window.location.href.includes('about.co.kr') ||
window.location.href.includes('iacstatic.co.kr') ||
window.location.href.includes('adop.cc') ||
window.location.href.includes('adnxs.com') ||
window.location.href.includes('g.doubleclick.net') ||
window.location.href.includes('bidr.io') ||
window.location.href.includes('vntsm.com')
    ? (window.location.href = 'about:blank')
    : undefined;

window.addEventListener('load', function () {
    if (window.location.href.includes('arca.live')) {
        document.querySelector('.body .right-sidebar .ad').style.display = 'none';
        document.querySelector('.body .left-ad-area .small-ad').style.display = 'none';
        const topAd = document.querySelectorAll('div[data-ad-b=f]')[1];
        if (hasIframe(topAd) || isSponsored()) {
            topAd.style.backgroundImage =
                'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIKCSB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNDU2IDE4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQ1NiAxODA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAxNzA5OTYwNTk0MzUyOTU1MzU2ODAwMDAwMTY3OTI0MzI5MDQ3ODc5MzA1MDBfKTt9Cgkuc3Qxe2ZpbGw6I0IzQjNCMzt9Cgkuc3Qye2NsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMDEyNDMyOTE2MDU0MTYxOTQwNDkwMDAwMDE1NjUxMzEwMjkzNzMyMjc4OTY4Xyk7fQoJLnN0M3tmaWxsOiNGNUY1RjU7c3Ryb2tlOiM5OTk5OTk7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQoJCgkJLnN0NHtjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDEwODI3Njg1ODExODU0MTY5MDUwMDAwMDAwMDEyMDk5MDczNjMyNTk1OTEwMF8pO2ZpbGw6I0Y1RjVGNTtzdHJva2U6Izk5OTk5OTtzdHJva2Utd2lkdGg6NDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9CgkKCQkuc3Q1e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMTQyODc1MDA0NTcyMzQ4NTU1OTkwMDAwMDAwODEwMjIwNzM5ODIzODE0MzI5Xyk7ZmlsbDojRjVGNUY1O3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDo0O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDZ7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAxMDc1OTAxMjQ1NDk5MDY5MzkwNjAwMDAwMTgzNjcxMTk4NjUwNTE4Mzc4ODBfKTtmaWxsOiM5OTk5OTk7fQoJLnN0N3tjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDAxODk1NDk3Mjg2NjI2NzkzNTY0MDAwMDAwODQxMTkxMTY5OTA0MDAzMzIwMV8pO2ZpbGw6Izk5OTk5OTt9CgkKCQkuc3Q4e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMDMxMjA5NTQ4NTc1NjI2OTMyNjEwMDAwMDAwNjI1NjA1MzU3NTYxOTQwODkyXyk7ZmlsbDojRkRENEI1O3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9CgkKCQkuc3Q5e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMTA2MTA3NzkwNTI5MzQ0NTMyNjAwMDAwMDE3OTcwMTQ0MzE2MzE1NzIwNjMwXyk7ZmlsbDpub25lO3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCQoJCS5zdDEwe2NsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMDQ2MzA3NTA2NjAxMDg4NDQ4NTIwMDAwMDA4MDYyNjk5MTc0OTk2MjY2OTM3Xyk7ZmlsbDpub25lO3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDExe29wYWNpdHk6MC41O30KCS5zdDEye2ZpbGw6I0ZGRkZGRjt9Cgkuc3QxM3tlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDE0e2ZpbGw6IzgwODA4MDt9Cjwvc3R5bGU+CjxnPgoJPGc+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8xXyIgd2lkdGg9IjE0NTYiIGhlaWdodD0iMTgwIi8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMDAwMDAxMDI1MDQwNzI1ODUwMjA3NTExMzAwMDAwMDkxMDUwNzA0MzM2NzA1NTA5MTJfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJCTxnIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDEwMjUwNDA3MjU4NTAyMDc1MTEzMDAwMDAwOTEwNTA3MDQzMzY3MDU1MDkxMl8pOyI+CgkJCTxyZWN0IHk9Ii0wLjkiIGNsYXNzPSJzdDEiIHdpZHRoPSIxNDU2IiBoZWlnaHQ9IjE4MC45Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8wMDAwMDA5MzE1MDg0Nzc4MjAyNzEyNDMxMDAwMDAwMDcxNDI2NzExNzg5MTcwMTE3N18iIHdpZHRoPSIxNDU2IiBoZWlnaHQ9IjE4MCIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzAwMDAwMDUxMzU3MDAyOTMzOTIwNDk0MTcwMDAwMDE0OTk3NTUwMTYzNTg3MDQxMTczXyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzAwMDAwMDkzMTUwODQ3NzgyMDI3MTI0MzEwMDAwMDAwNzE0MjY3MTE3ODkxNzAxMTc3XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+CgkJPGcgc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMDUxMzU3MDAyOTMzOTIwNDk0MTcwMDAwMDE0OTk3NTUwMTYzNTg3MDQxMTczXyk7Ij4KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTEwMDcuNSw2Ni42YzguMS00LjcsNS41LTQuMiwyMi41LTguNnMzMy40LDkuNiwzMiwyNy4xcy05LjgsMjkuNS0yOSwzMC40Yy0xOS4yLDAuOS0zMC4zLTctNDEuOS01LjUKCQkJCWMtMTEuNiwxLjUtMTYuMi0xNi01LjEtMjYuNkM5OTcsNzIuOSw5OTkuNCw3MS4zLDEwMDcuNSw2Ni42eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNOTg2LjQsMTA1LjdjMCwwLDcuMy0xNCwyMC44LTE4czI3LjEtNi44LDMzLDIuOWM1LjksOS43LDUuMywyMS44LDUuMywyMS44Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik05OTEuMSwxMTAuMWMwLjEtMS41LDE3LjktMTcuMiwzMS4zLTE1czIwLjEsMTMuMywxOS45LDE4Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik05OTMuMiwxMDkuOGM1LjUtNC41LDEyLjEtOC4zLDE5LjItOS4zYzcuOS0xLjEsMTUuNiwxLjcsMTkuNSw1LjFjMi40LDIuMSw1LjgsNS40LDYuNiw4LjgiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzAwMDAwMTQ0MzA1MzgyMzg0OTAzNzM4NjAwMDAwMDAyNTI3NTMwNzc4MjUwODcxNDg2XyIgd2lkdGg9IjE0NTYiIGhlaWdodD0iMTgwIi8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMDAwMDAxNDI4OTg0NDI3MjczNDQxMDg4OTAwMDAwMTA3NDQ0NDY4ODA3ODMzMjYxMTlfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMDAwMDAxNDQzMDUzODIzODQ5MDM3Mzg2MDAwMDAwMDI1Mjc1MzA3NzgyNTA4NzE0ODZfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCQkKCQkJPHBhdGggc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMTQyODk4NDQyNzI3MzQ0MTA4ODkwMDAwMDEwNzQ0NDQ2ODgwNzgzMzI2MTE5Xyk7ZmlsbDojRjVGNUY1O3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDo0O3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgZD0iCgkJCU05MDQuNywyMTcuMWMtMi44LTEwLjgtMy4xLTIyLjEtMy41LTMzLjNjLTAuMi01LjktMC40LTExLjgtMC42LTE3LjZjLTAuNywwLjktMS40LDEuOS0yLjEsMi44Yy0zLjcsNS40LTYuNSwxMS40LTguMiwxNy42CgkJCWMtMS44LDYuOC0zLDE2LjItNC4yLDIzLjJjLTAuNywzLjktMC42LDEwLjYtNS42LDExLjVjLTMuMSwwLjUtNSwwLjEtNi44LTIuNWMtMy43LTUtMy41LTI0LjEtMC4yLTM3LjQKCQkJYzIuOC0xMS42LDctMjIuOSwxNS4xLTMyLjVjNC44LTUuNywxNi0xNCwzNS45LTE1LjVjMTUuNS0xLjEsMTcuNSwyLjQsMjIuNCw1LjFjNC45LDIuNyw5LjYsMS44LDE0LjMsMQoJCQljOC4zLTEuNSwyMi41LTE0LjQsMjguNy0yMi45YzQuOS02LjgsNi0yMy4xLDE1LjEtMjQuNmMxNC4zLTIuMywzLjQsMjUuOSwwLjQsMzEuOWMtNi4yLDEyLjctMTEsMjAtMTYuOCwyNi4xCgkJCWMtMS45LDEuOS04LjcsNy42LTguMywxMC42czksMzguOSwxMS4zLDQ5LjQiLz4KCTwvZz4KCTxnPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMDAwMDAxMTY5MzI3MDIyODQwMTAxODI4NDAwMDAwMTYwMDY5NzM0MTQ4NzU5Mzk0NzJfIiB3aWR0aD0iMTQ1NiIgaGVpZ2h0PSIxODAiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8wMDAwMDEyMzQyNjcyNjQzNzk2MzA4MTQ5MDAwMDAwNTI1MzA3NjcxNzQyNjI2NjI2N18iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8wMDAwMDExNjkzMjcwMjI4NDAxMDE4Mjg0MDAwMDAxNjAwNjk3MzQxNDg3NTkzOTQ3Ml8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJCQoJCQk8cGF0aCBzdHlsZT0iY2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAxMjM0MjY3MjY0Mzc5NjMwODE0OTAwMDAwMDUyNTMwNzY3MTc0MjYyNjYyNjdfKTtmaWxsOiNGNUY1RjU7c3Ryb2tlOiM5OTk5OTk7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiBkPSIKCQkJTTg5NC4yLDM4LjljMCwwLDguMi0yMC40LDE1LTE5LjhzNy42LDE3LjIsNy42LDE3LjJsNDIuNiwwLjVjMCwwLDguOC0xNi42LDE1LjctMTUuNGM3LDEuMiw4LDE3LjQsOCwxNy40czE1LjUsMTIuNiwxOS4zLDM0LjIKCQkJYzkuOSw1Ni4yLTU2LjgsODIuNC0xMDMuOCw3Ny40Yy0wLjMsMC0wLjYtMC4xLTAuOS0wLjFjLTIxLjMtMi43LTUwLjItMTAuNS01OS40LTMyLjRjLTExLjUtMjcuMiwxMi45LTUxLjYsMjIuMy01OC42CgkJCUM4NzAuMSw1Mi4xLDg5NC4yLDM4LjksODk0LjIsMzguOXoiLz4KCTwvZz4KCTxnPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMDAwMDAwNTkzMDYzNjk2OTMwNTQxNDIxMTAwMDAwMTE1MjEzMDc0OTAzODk4Mjc3MTNfIiB3aWR0aD0iMTQ1NiIgaGVpZ2h0PSIxODAiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8wMDAwMDA0OTkwNzU5MDQ2MjYwNzk5NTY1MDAwMDAwMzU5NjU2MDk3MjI2NDExMjI2OF8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8wMDAwMDA1OTMwNjM2OTY5MzA1NDE0MjExMDAwMDAxMTUyMTMwNzQ5MDM4OTgyNzcxM18iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJCTxwYXRoIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDA0OTkwNzU5MDQ2MjYwNzk5NTY1MDAwMDAwMzU5NjU2MDk3MjI2NDExMjI2OF8pO2ZpbGw6Izk5OTk5OTsiIGQ9Ik05MjQsMzcuNAoJCQljMCwwLTQuOSwxMS4xLTAuOSwxMGM0LTEsOS40LTgsMTAuNS0xMC41TDkyNCwzNy40eiIvPgoJPC9nPgoJPGc+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8wMDAwMDA3ODc2MTk4MzcxNTI0ODU3OTYwMDAwMDAwMTg1MjIwODM0NzA4NTc0MjIzM18iIHdpZHRoPSIxNDU2IiBoZWlnaHQ9IjE4MCIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzAwMDAwMDE1MzE4Nzg0NDA5MDk4MTIwNzEwMDAwMDEzMDcyODMzNDIxMDQwNDIyMDI2XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzAwMDAwMDc4NzYxOTgzNzE1MjQ4NTc5NjAwMDAwMDAxODUyMjA4MzQ3MDg1NzQyMjMzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+CgkJPHBhdGggc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMDE1MzE4Nzg0NDA5MDk4MTIwNzEwMDAwMDEzMDcyODMzNDIxMDQwNDIyMDI2Xyk7ZmlsbDojOTk5OTk5OyIgZD0iTTk0Mi41LDM3LjEKCQkJYzAsMC00LjksMTEuMS0wLjksMTBjNC0xLDkuNS03LjIsMTAuNi05LjdMOTQyLjUsMzcuMXoiLz4KCTwvZz4KCTxnPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMDAwMDAxNjczNjE5NzkwNjU2NDA1MzMwNjAwMDAwMTM3MTIzODM0NDg4ODY2MjUxNThfIiB3aWR0aD0iMTQ1NiIgaGVpZ2h0PSIxODAiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8wMDAwMDExMTE5MzQ4MjQ5Mjg5MzYwNjQxMDAwMDAwMDg4ODc2MTIwNjIzOTc4OTcxNF8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8wMDAwMDE2NzM2MTk3OTA2NTY0MDUzMzA2MDAwMDAxMzcxMjM4MzQ0ODg4NjYyNTE1OF8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJCQoJCQk8cGF0aCBzdHlsZT0iY2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAxMTExOTM0ODI0OTI4OTM2MDY0MTAwMDAwMDA4ODg3NjEyMDYyMzk3ODk3MTRfKTtmaWxsOiNGREQ0QjU7c3Ryb2tlOiM5OTk5OTk7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgZD0iCgkJCU05MTYuMiw3MS43YzEsNC41LDUuOCw3LjYsMTAuNSw3LjRjNC42LTAuMiw4LjgtMy4yLDExLjMtNy4xYzAuMi0wLjMsMC4zLTAuNiwwLjMtMC45YzAtMC45LTEuMS0xLjItMi0xLjMKCQkJYy03LjItMC42LTE0LjQtMC41LTIxLjUsMC4yIi8+Cgk8L2c+Cgk8Zz4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzAwMDAwMTI0ODg0NjU1OTU2MTg2MTMxNzQwMDAwMDA2Njk4MjgyNTk0NDA5Njg4MjQ2XyIgd2lkdGg9IjE0NTYiIGhlaWdodD0iMTgwIi8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMDAwMDAxNjk1NDYwODc3NDU1NzczNzUzNDAwMDAwMTAyMTc0MDY5NjkyNDUxMjE2OTdfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMDAwMDAxMjQ4ODQ2NTU5NTYxODYxMzE3NDAwMDAwMDY2OTgyODI1OTQ0MDk2ODgyNDZfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCQkKCQkJPHBhdGggc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMTY5NTQ2MDg3NzQ1NTc3Mzc1MzQwMDAwMDEwMjE3NDA2OTY5MjQ1MTIxNjk3Xyk7ZmlsbDpub25lO3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgZD0iCgkJCU04OTAuMyw1OC4xYzQuOC0xLjIsOS43LTEuOSwxNC42LTIuMSIvPgoJPC9nPgoJPGc+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8wMDAwMDAzNjkzMzU0NjY0MDAyMjc2NDM4MDAwMDAwNzcxOTU1MzMwMzI0MDczNTM3NV8iIHdpZHRoPSIxNDU2IiBoZWlnaHQ9IjE4MCIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzAwMDAwMTcwMjQ4ODk5MTMxODE1MDg1NzgwMDAwMDA0OTYxOTA3MjY4NTk1ODE2Mzc4XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzAwMDAwMDM2OTMzNTQ2NjQwMDIyNzY0MzgwMDAwMDA3NzE5NTUzMzAzMjQwNzM1Mzc1XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+CgkJCgkJCTxwYXRoIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDE3MDI0ODg5OTEzMTgxNTA4NTc4MDAwMDAwNDk2MTkwNzI2ODU5NTgxNjM3OF8pO2ZpbGw6bm9uZTtzdHJva2U6Izk5OTk5OTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIGQ9IgoJCQlNOTUwLjIsNTcuMmM0LjcsMC40LDkuNCwwLjksMTQuMiwxLjMiLz4KCTwvZz4KPC9nPgo8ZyBjbGFzcz0ic3QxMSI+Cgk8cGF0aCBjbGFzcz0ic3QxMiIgZD0iTTcxNi4xLDEzOC4yYzExLjktMi4yLDI3LjQtMC4zLDQ1LjYtOC45YzktNC4yLDE3LjMtOS44LDIyLjUtMTcuMWMzLjUtNC45LDMuNC0yMS42LDMuNC0yMS42bDE5LjQtMTMKCQlsLTI3LjgtNy44YzAsMC0zLjYtMzEuMy02Ni43LTM0LjJjLTQ0LjEtMi4xLTg4LjctNi44LTEzMS4xLDMuNGMtMTYuNSwzLjktMzIuOCw5LjMtNDUuOCwxOC40cy0yMi41LDIyLjMtMjIuMiwzNi4yCgkJYzAuNCwyMS40LDIzLjQsMzksNDguNyw0NS4xbDAsMGMyMyw1LjYsNzYuNSw0LjksNzYuNSw0LjlTNzA4LjEsMTM5LjYsNzE2LjEsMTM4LjJ6Ii8+CjwvZz4KPGc+Cgk8ZyBjbGFzcz0ic3QxMyI+CgkJPHBhdGggY2xhc3M9InN0MTQiIGQ9Ik01NzguNiw4N2g4LjRsLTQsMjQuMmgtMTAuOUw1NzguNiw4N3ogTTU4OS45LDc2LjljMCwxLjgtMC42LDMuMy0xLjcsNC40Yy0xLjEsMS4xLTIuNiwxLjYtNC42LDEuNgoJCQljLTEuNSwwLTIuNi0wLjMtMy40LTFjLTAuOC0wLjctMS4yLTEuNy0xLjItM2MwLTEuOSwwLjUtMy4zLDEuNi00LjNjMS4xLTEsMi42LTEuNSw0LjQtMS41YzEuNSwwLDIuNywwLjMsMy41LDEKCQkJQzU4OS41LDc0LjcsNTg5LjksNzUuNiw1ODkuOSw3Ni45eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDE0IiBkPSJNNjIwLjYsMTAyLjVoLTEwbDMuMi0xNS4zSDYwNWwtMy4yLDE1LjNoLTEwbDcuOS0zNy40aDEwTDYwNi43LDc5aDguOWwyLjktMTMuOWgxMEw2MjAuNiwxMDIuNXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QxNCIgZD0iTTY0MS42LDEwM2MtMy42LDAtNi4zLTEtOC4zLTIuOWMtMS45LTEuOS0yLjktNC43LTIuOS04LjNjMC0zLjYsMC43LTYuOCwyLTkuN2MxLjQtMi45LDMuMy01LjEsNS43LTYuNwoJCQljMi41LTEuNiw1LjMtMi40LDguNi0yLjRjMy42LDAsNi4zLDEsOC4zLDIuOWMxLjksMS45LDIuOSw0LjcsMi45LDguM2MwLDMuNi0wLjcsNi44LTIsOS43cy0zLjMsNS4xLTUuNyw2LjcKCQkJQzY0Ny43LDEwMi4yLDY0NC45LDEwMyw2NDEuNiwxMDN6IE02NDUuNiw4MC41Yy0xLjQsMC0yLjYsMS4yLTMuNiwzLjZjLTEsMi40LTEuNSw1LjEtMS41LDguMmMwLDIuMywwLjcsMy40LDIuMSwzLjQKCQkJYzEuNCwwLDIuNi0xLjIsMy42LTMuNmMxLTIuNCwxLjUtNS4xLDEuNS04LjJjMC0xLjEtMC4yLTItMC42LTIuNUM2NDYuOCw4MC43LDY0Ni4zLDgwLjUsNjQ1LjYsODAuNXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QxNCIgZD0iTTY3MC42LDEwMi41aC05LjlsOC40LTM5LjhoOS45TDY3MC42LDEwMi41eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDE0IiBkPSJNNzAyLjIsMTAyLjVoLTcuOWwwLjMtMy4xaC0wLjJjLTEsMS4zLTIsMi4zLTMuMSwyLjhjLTEuMSwwLjYtMi40LDAuOC0zLjgsMC44Yy0yLjcsMC00LjctMS02LjEtMi45CgkJCXMtMi4xLTQuNi0yLjEtOC4yYzAtMy4xLDAuNi02LjIsMS45LTkuM3MyLjgtNS42LDQuNy03LjJjMS45LTEuNiw0LTIuNCw2LjMtMi40YzEuNCwwLDIuNywwLjMsMy44LDFjMS4xLDAuNiwyLjEsMS43LDIuOSwzLjFoMC4yCgkJCWwxLjQtMy42aDcuOUw3MDIuMiwxMDIuNXogTTY5MS42LDk1LjFjMC45LDAsMS43LTAuNSwyLjQtMS41YzAuOC0xLDEuNC0yLjMsMS45LTRzMC43LTMuMywwLjctNC45YzAtMS4xLTAuMi0yLTAuNS0yLjcKCQkJYy0wLjMtMC43LTAuOS0xLTEuNi0xYy0xLjMsMC0yLjUsMS4xLTMuNSwzLjJjLTEsMi4yLTEuNiw0LjYtMS42LDcuMkM2ODkuNCw5My44LDY5MC4xLDk1LjEsNjkxLjYsOTUuMXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QxNCIgZD0iTTcwOS4zLDk5LjNjMC0xLjgsMC42LTMuMywxLjctNC40YzEuMS0xLjEsMi42LTEuNiw0LjYtMS42YzEuNSwwLDIuNiwwLjMsMy40LDFjMC44LDAuNywxLjIsMS43LDEuMiwyLjkKCQkJYzAsMS45LTAuNSwzLjMtMS42LDQuNGMtMS4xLDEtMi42LDEuNS00LjQsMS41Yy0xLjUsMC0yLjctMC4zLTMuNS0xQzcwOS43LDEwMS41LDcwOS4zLDEwMC41LDcwOS4zLDk5LjN6IE03MjAuNSw4OS4zaC04LjQKCQkJbDQtMjQuMkg3MjdMNzIwLjUsODkuM3oiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K")';
        }
        const removeSidebarAd = setInterval(() => {
            document.querySelector('.body .right-sidebar .ad').style.display = 'none';
            document.querySelector('.body .left-ad-area .small-ad').style.display = 'none';
            document.querySelectorAll('.body .right-sidebar .ad').forEach((e) => {
                e.style.display = 'none';
            });
            document.querySelectorAll('.body .left-ad-area .small-ad').forEach((e) => {
                e.style.display = 'none';
            });
        });
        setTimeout(() => {
            clearInterval(removeSidebarAd);
        }, 3000);
    }
});
