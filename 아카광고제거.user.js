// ==UserScript==
// @name        아카광고제거
// @match       https://*.criteo.net/*
// @match       https://*.about.co.kr/*
// @match       https://*.iacstatic.co.kr/*
// @match       https://*.adop.cc/*
// @match       https://*.adnxs.com/*
// @match       https://*.g.doubleclick.net/*
// @match       https://arca.live/*
// @grant       none
// @version     1.2
// @author      PantaFive
// @homepageURL https://github.com/panta5/arca-live-ad
// @downloadURL https://github.com/panta5/arca-live-ad/raw/main/%EC%95%84%EC%B9%B4%EA%B4%91%EA%B3%A0%EC%A0%9C%EA%B1%B0.user.js
// @description 사이드바 광고 없애기. 적자? 알빠노? (유저광고 제외)
// ==/UserScript==

// 최종수정일: 2024-Jan-30 10:47 KST

const hasIframe = (e) => {
  if(e?.tagName.toLowerCase() === 'iframe') {
    return true;
  }
  let children = e?.children;
  for(let i = 0; i < children?.length; i++) {
    if(hasIframe(children[i])) {
      return true;
    }
  }
  return false;
}

const isSponsored = () => {
  if(document.querySelectorAll('a.a-badge.sponsored')?.length > 0) return true;
  else return false;
}

window.location.href.includes("criteo.net") || window.location.href.includes("about.co.kr") || window.location.href.includes("iacstatic.co.kr") || window.location.href.includes("adop.cc") || window.location.href.includes("adnxs.com") || window.location.href.includes("g.doubleclick.net") ? window.location.href = "about:blank" : undefined;

if (window.location.href.includes("arca.live")) {
  document.querySelector('.body .right-sidebar .ad').style.display = 'none';
  document.querySelector('.body .left-ad-area .small-ad').style.display = 'none';
  const topAd = document.querySelectorAll('div[data-ad-b=f]')[1];

  const itv = setInterval(()=>{
    if(hasIframe(topAd) || isSponsored()) {
      topAd.style.backgroundImage = 'url("data:image/webp;base64,UklGRrAMAABXRUJQVlA4WAoAAAAgAAAA1wIAWQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggwgoAABA9AJ0BKtgCWgA+MRiLRCIhoREpnJggAwS0t3C6qI32Gv8U/Gvv9/kP5B/tb2tfij1t0Dv4v9XPqf9g/ZD8wvZa8KeAF+J/xH+mfjt+63+e5fYAH5L/Jf7P/Yv2r8/H9Q/KP3R8QD9P/8N61eDzQA/lX80/5X9y/Hn4dv7L/Efur/ivbR8//8//EfAd/KP6L/pP8D+6399////48jP7qexB+1gngqLZgEkyQVFswCSZIKi2YBJMkFRbMAkmSCotlHRghKlmx+zGqo9jYWVkGuq5nA/QI/Fah9UjKqTGyiHjqbqMTPDPw5bKpPDzEUW7hrO5D++Yl260lYa8f0CBqVdnswCSZIKi2YBJMkFPhIByBdC4oI717mvS/4UpEAVpmgkgzurRgSKhDuzRuSAXPXCbUw4C7qGCopZafim+H1D15/UK6C7mzrr/hgtT1JRjjHMn4JhdzbMAkmSCotmASTJBT1IDRPOdwMVOoPh2bwIqU6LIWqYZmWTBsAzZaenvj8dTVL0E1CRihV2MtS1JuLJlgO58kn7/7yAoIuWZu3qRJcptNL1SZIKi2YBJMkFRbMAfOeZtidLkIJ3QKTFYo+8P4gdTqSzmQWf6RO9BSzC045cdbMAkmSCotmASTJBUWzAJJkg29s1JDift/oKi2XgAAP7/2JgABn5es3Uuhv7ouI8Sm5cpeKOf/yMaoaGOA93ru//i5dMt1cICQ/deYAsAaCElyT57F/C431kUcfOePwMgZsUaUBnMyvIXDrDtlwvFxn3/cB+eC0HKpDme0tIYKL+O1zEs8SShCuQSb4nRZ2YVSRYfCGB3PX5bcCb1+3bqG9+hlEBycv6VIR+ExJxMp041nzpjIczVYskFihXNTqLZ0jzYu/10PTG4mKMWsnmIuQ02/ix40xIqbzWx7nJFpF9GKM5ow2BETpt7TJaHkedsCtH/5X8twaBFmn6/KEPhP4BxzeCZweWzdGW3cgqxGF0wqRO2jX37mPkimDXyiLLnIeDuqaqBbLpZ4x72zX3/1HZRRs9olG5pIEUGB8jw6lTWEzr8+oT1qs7ukK6MoSNHFkjq64aslUGWp11aO/MUV/T1bhFYh1v8CTxGvUgMTWDkjlfB/7BOA/j8Xeo0//xKkf/DdV01y4LxEXDHtqH2vAIb/N7/9R2k7dF6gfKJB7fejxEt3zagiPgGMwvffdKAYk+gW7K6AvmrSAzip2i22kxrhIx/RJ09yeduKNCt9HldGAQJuusX9Qccc6W8Wm3nH8SP5SM7hzgSQyLrokBUfNhjFlW437FOk/g+ciTWb/oHxMPLNYHJz8z4gCKYE+TXDnAAADzR4NtGJ05DCoAUXTAvW27Q2bE5mRKcj5DTP/lVrgHdLQ/9OzcXBf/yrDhOkyoZiYDmD5EVCBS093b/61U+QYODXWFxNkB9DME9DHymbc0oDfoxWoWQuFhaaJBr5Rsfh3eDB/ijV1JDU/OXFSNceFf5yQoTSy9JGtfeY8Lz33t7dc97KJ4QP/8PeDTA6MZr3aLMBGTbSgeKUvA2VnxN5uC1sVYzXmUflQEESXCcSpEjHPOaScHkxQdDgdPhKovvnDlOhq+Qr/3jbsryckvXVDuSwzoLtxgI3cABIs2hfhw+vQ/Q2M3RwJor8A24f3J01lnCHNno5t3Z8X4/wid2Max9jt+s2YYOSesTfkjxWJAh5weuIrfVgXj12PL2yEdRUzm0nb5EkxaeZU+acCORmj/lulTl1uztKvL7UiXC3MwcnINPAyGfElHQ5JymxMHoIBWBUG/c2VTXZVR1auhtUMa2aR85KEMF8Q7apabI34b1uuppRZ+ClGlAOWpj6A5DrmtRVvPMz8OFXNiMnbloTcDLQ9HI65wz40oVotJJpGGXgIGv1LpXtsrwhG/nqzWq3aJc+uku0BumwAluh+WVUAn9JXKF9mKUtzOtJvuG/aT/4H9pxit13a9VwCsN4bN1Z3TMyg3299pE37MbfCPeJS3V36mimEzeZf9ufPtpz06HOF0VfNIb31RliYXL9nLBdTdpse39MW/l9diBPtf9EZrn66pX64kUyn0JeDy+SxIoLMRl0xX52eAg2g/w7MqwDLy+/9DaQpreGoO5hnHiXIMcQEVgtWo1StxHOCUWZoP84Ea0E3whrenq5/8lsrNj4bVoSKqn2XYMxas0qiMtyNlgpZ6kJtXd3O/NdKC9fRuqKlIqvZ4hgr8ugP0uiSEm0mI7dDistVz4af07HH6RWqAsQeA82HMGKrFXRT/18p1koI60OkbGHdhfiqG9Z8w51Bw45zVTfkAz6CWnrn69CAjubAzXUAbJX+IVtIGtLAYWGvjrXv/7ob8fIDlWb3jP55QlgeJ8TBifwGH0u+mzN35qoksoCjlG2e1mlsuwqaCkw7h87PPHPZYM/tsCjy1Igazv6oCxVfI42G/PDEeEfxPvJgP+FN5TLDXwz9yQxuyzq0AOeIx/OuTPBH+UBs8BLV2QLD1c164/zzKPdr9yflU0yRANcWxjcenBK+/vwyBRafJv08xcQ5/S59FkB4YLPbt4Hgp7iPj+BiNO3FqB5qg5ymJoMo1D4DKF4bFje1qxj1nRpkeShpU+4GhOpAWkOxpyiRW6VwDJkbDo1cazAeER2JBh4y/YNTsXg28/88LeiICb+QYnYXlkP2EcIZ0UMnrq3HOXY4WVIh3jGatBNVBmmoT2xbfgy0XQjkXzsfVI7JM+y9r7Gn49B3drkDRl9w9xyY++DutHllNZbviwIZvYllaWbbCfppxFHD0/slEg05rVOd8r8yHiD/RdXYOfHtJFJsFdim6TVFYRYHMtSK5TJXEOSPmaX1Xwt/thueLGISolACXeIVCsxnnnP511Lfq/rkkWk1iXDWAXEB7iBMqE7XtfwiwBJbPrLcSW5Ds0wMCLRHj/7dSZZfN3SJhVFFc9mBDjFmDllKixiNweoNV/Jmh/hu06qjULT776+tNPyVCc+eU326EcQUcPyk0sWuZzLRXwndDgQGYA6yajWN3mQLVhkuzmQc3c6MeXrmXVIkfrdXrr+qmomhqSy9Sd40ShOmk4e4pMS4HO03KKE3cI+Dh6cKQLGBvAjTKSgPvp+BJyuH8kMFpwJA0wV3jSSKN9PdxvgJc/EaBxEElkT4i2FxBeiCEED3yuKNkUWlnuAVSWgixeWcEllUPpbVhZvNy70dSwma6TEKc5+DhX4AdgQl697+/ATMh22eVHi2vzU1a7IZ68F87Hts8lfFIXVMutqZSWJb6YOhnAQ8nQjAaNy4/9wg8hCw492r625Ln4IwoKvkTxqJZgRmI+GXRM6PHYaoNRrOiS+fFE4ksgLh0+Xkjup9fydd0T0SGFxZJ+YI+/7XIW3WWct/UMlof8lABPg5xX/R+UWj9Etc/F4qNqbOiA05ImRum9KMlL6pOBZdyC3c2SIei2Zcss8wiv3ooABp0WcNinT2Pw1kdLS0S4yJi8AgrS/ee3yDJY9NZuJxpg+z0Ay3JgvoEthjIFK475zXxwupiiDNUVOQGEE2h3jwvl7jafwrSrpgAh9wLzT9NYrXJEXaLtfiyWzlv0oc1cp2cONraN4aXvFy9TsHeSd+YeFwD2UsSlcrWq78+91b7+NRSdOaQKYf9QtXokUFdq70+GI0WrIBljC/l4sXopKEW/7DUwAAAAAA==")';
      clearInterval(itv);
    }
  }, 100);

  setTimeout(()=>{
    clearInterval(itv);
    console.log('Interval Cleared!');
  }, 500);
}
