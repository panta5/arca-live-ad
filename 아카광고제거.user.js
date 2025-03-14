// ==UserScript==
// @name        아카광고제거
// @match       https://*.criteo.net/*
// @match       https://*.about.co.kr/*
// @match       https://*.iacstatic.co.kr/*
// @match       https://*.adop.cc/*
// @match       https://*.adnxs.com/*
// @match       https://*.adnxs-simple.com/*
// @match       https://*.g.doubleclick.net/*
// @match       https://*.bidr.io/*
// @match       https://*.vntsm.com/*
// @match       https://*.openx.net/*
// @match       https://*.outbrain.com/*
// @match       https://*.outbrainimg.com/*
// @match       https://*.quantcount.com/*
// @match       https://*.quantserve.com/*
// @match       https://*.flashtalking.com/*
// @match       https://*.ad-score.com/*
// @match       https://*./*
// @match       https://arca.live/*
// @exclude     https://arca.live/r/*
// @grant       none
// @version     1.35
// @author      PantaFive
// @homepageURL https://github.com/panta5/arca-live-ad
// @downloadURL https://github.com/panta5/arca-live-ad/raw/main/%EC%95%84%EC%B9%B4%EA%B4%91%EA%B3%A0%EC%A0%9C%EA%B1%B0.user.js
// @description 사이드바 광고 없애기. 적자? 알빠노? (유저광고 제외)
// ==/UserScript==

// 최종수정일: 2024-Jul-31 21:35 KST

window.location.href.includes('criteo.net') ||
window.location.href.includes('about.co.kr') ||
window.location.href.includes('iacstatic.co.kr') ||
window.location.href.includes('adop.cc') ||
window.location.href.includes('adnxs.com') ||
window.location.href.includes('adnxs-simple.com') ||
window.location.href.includes('g.doubleclick.net') ||
window.location.href.includes('bidr.io') ||
window.location.href.includes('vntsm.com') ||
window.location.href.includes('openx.net') ||
window.location.href.includes('outbrain.com') ||
window.location.href.includes('outbrainimg.com') ||
window.location.href.includes('quantcount.com') ||
window.location.href.includes('quantserve.com') ||
window.location.href.includes('flashtalking.com') ||
window.location.href.includes('ad-score.com')
    ? (window.location.href = 'about:blank')
    : undefined;

const actJustice = (topAd) => {
    const topAdIframe = topAd.childNodes[0].childNodes[0].childNodes[0];
    if (topAdIframe) {
        topAdIframe.style.display = 'none';
        topAd.style.backgroundImage = 'url("https://raw.githubusercontent.com/panta5/arca-live-ad/main/empty_ad.svg")';
    }
};

window.addEventListener('load', function () {
    if (window.location.href.includes('arca.live/u/login')) return;
    if (window.location.href.includes('arca.live')) {
        const customStyle = document.createElement('style');
        customStyle.innerHTML = `iframe:not(iframe.arca-vote):not(#preview_frame):not(.body .board-article .article-body .article-content iframe):not(#hcaptcha-section > iframe:nth-child(1)):not(iframe[src*="hcaptcha.com"]), .body .right-sidebar .ad, .body .left-ad-area .small-ad {display: none !important;}`;
        document.head.appendChild(customStyle);
        const topAd = document.querySelectorAll('div[data-ad-b=f]')[1];
        setTimeout(() => {
            actJustice(topAd);
        }, 1500).then(() => {
            actJustice(topAd);
        });
    }
});
