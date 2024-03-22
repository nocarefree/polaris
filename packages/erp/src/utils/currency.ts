let Eo:any;
(function(e) {
    e.DirectionControl = "[‎‏‪-‮]",
    e.Negative = "[-֊־᠆‐-―−➖⸺⸻﹘﹣－]",
    e.Punctuation = "[!-#%-\\*,-\\/:;\\?@\\[-\\]_\\{\\}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؝-؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰৽੶૰౷಄෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᭽᭾᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹏⹒-⹝、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･\uD800]|[\uDD00-\uDD02\uDF9F\uDFD0]|𐕯|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|𛲟|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]",
    e.Latin = "[A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꟿꬰ-ꭚꭜ-ꭤꭦ-ꭩﬀ-ﬆＡ-Ｚａ-ｚ]|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD837[\uDF00-\uDF1E]",
    e.Han = "[⺀-⺙⺛-⻳⼀-⿕々〇〡-〩〸-〻㐀-䶿一-鿿豈-舘並-龎]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]",
    e.Hangul = "[ᄀ-ᇿ〮〯ㄱ-ㆎ㈀-㈞㉠-㉾ꥠ-ꥼ가-힣ힰ-ퟆퟋ-ퟻﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]",
    e.Katakana = "[ァ-ヺヽ-ヿㇰ-ㇿ㋐-㋾㌀-㍗ｦ-ｯｱ-ﾝ\uD82B]|[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD64-\uDD67]",
    e.Hiragana = "[ぁ-ゖゝ-ゟ]|\uD82C[\uDC01-\uDD1F\uDD50-\uDD52]|🈀",
    e.Thai = "[ก-ฺเ-๛]"
}
)(Eo || (Eo = {}));

const i4 = 2
  , BV = new Map([["AED", 2], ["AFN", 2], ["ALL", 2], ["AMD", 2], ["ANG", 2], ["AOA", 2], ["ARS", 2], ["AUD", 2], ["AWG", 2], ["AZN", 2], ["BAM", 2], ["BBD", 2], ["BDT", 2], ["BGN", 2], ["BHD", 3], ["BIF", 0], ["BMD", 2], ["BND", 2], ["BOB", 2], ["BOV", 2], ["BRL", 2], ["BSD", 2], ["BTN", 2], ["BWP", 2], ["BYN", 2], ["BYR", 0], ["BZD", 2], ["CAD", 2], ["CDF", 2], ["CHE", 2], ["CHF", 2], ["CHW", 2], ["CLF", 4], ["CLP", 0], ["CNY", 2], ["COP", 2], ["COU", 2], ["CRC", 2], ["CUC", 2], ["CUP", 2], ["CVE", 2], ["CZK", 2], ["DJF", 0], ["DKK", 2], ["DOP", 2], ["DZD", 2], ["EGP", 2], ["ERN", 2], ["ETB", 2], ["EUR", 2], ["FJD", 2], ["FKP", 2], ["GBP", 2], ["GEL", 2], ["GHS", 2], ["GIP", 2], ["GMD", 2], ["GNF", 0], ["GTQ", 2], ["GYD", 2], ["HKD", 2], ["HNL", 2], ["HRK", 2], ["HTG", 2], ["HUF", 2], ["IDR", 2], ["ILS", 2], ["INR", 2], ["IQD", 3], ["IRR", 2], ["ISK", 0], ["JEP", 2], ["JMD", 2], ["JOD", 3], ["JPY", 0], ["KES", 2], ["KGS", 2], ["KHR", 2], ["KMF", 0], ["KPW", 2], ["KRW", 0], ["KWD", 3], ["KYD", 2], ["KZT", 2], ["LAK", 2], ["LBP", 2], ["LKR", 2], ["LRD", 2], ["LSL", 2], ["LYD", 3], ["MAD", 2], ["MDL", 2], ["MGA", 2], ["MKD", 2], ["MMK", 2], ["MNT", 2], ["MOP", 2], ["MRO", 5], ["MUR", 2], ["MVR", 2], ["MWK", 2], ["MXN", 2], ["MXV", 2], ["MYR", 2], ["MZN", 2], ["NAD", 2], ["NGN", 2], ["NIO", 2], ["NOK", 2], ["NPR", 2], ["NZD", 2], ["OMR", 3], ["PAB", 2], ["PEN", 2], ["PGK", 2], ["PHP", 2], ["PKR", 2], ["PLN", 2], ["PYG", 0], ["QAR", 2], ["RON", 2], ["RSD", 2], ["RUB", 2], ["RWF", 0], ["SAR", 2], ["SBD", 2], ["SCR", 2], ["SDG", 2], ["SEK", 2], ["SGD", 2], ["SHP", 2], ["SLL", 2], ["SOS", 2], ["SRD", 2], ["SSP", 2], ["STD", 2], ["STN", 2], ["SVC", 2], ["SYP", 2], ["SZL", 2], ["THB", 2], ["TJS", 2], ["TMT", 2], ["TND", 3], ["TOP", 2], ["TRY", 2], ["TTD", 2], ["TWD", 2], ["TZS", 2], ["UAH", 2], ["UGX", 0], ["USD", 2], ["USN", 2], ["UYI", 0], ["UYU", 2], ["UYW", 4], ["UZS", 2], ["VED", 2], ["VEF", 2], ["VES", 2], ["VND", 0], ["VUV", 0], ["WST", 2], ["XAF", 0], ["XAG", 0], ["XAU", 0], ["XBA", 0], ["XBB", 0], ["XBC", 0], ["XBD", 0], ["XCD", 2], ["XDR", 0], ["XOF", 0], ["XPD", 0], ["XPF", 0], ["XPT", 0], ["XSU", 0], ["XTS", 0], ["XUA", 0], ["YER", 2], ["ZAR", 2], ["ZMW", 2], ["ZWL", 2]])
  , aAe = [Eo.Latin, Eo.Han, Eo.Hiragana, Eo.Katakana, Eo.Hangul, Eo.Thai];
function iAe(e) {
    return aAe.filter(t=>new RegExp(`${t}`).test(e))
}
function UV(e, t) {
    const n = oAe(0, e, t)
      , r = new RegExp(`${Eo.DirectionControl}*`,"gu")
      , a = n.replace(r, "")
      , i = new RegExp("\\p{Nd}\\p{Po}*\\p{Nd}*","gu").exec(a);
    if (!i)
        throw new Error(`Number input in locale ${e} is currently not supported.`);
    const o = i[0]
      , [s,l] = a.split(o);
    return {
        symbol: s || l,
        prefixed: s !== ""
    }
}
function oAe(e, t, n) {
    return af(t, {
        style: "currency",
        ...n
    }).format(e)
}
function sAe(e) {
    return e.replace(" ", " ")
}
const o4 = "."
  , lAe = "-"
  , cAe = /\d/g
  , jV = /\D/g
  , uAe = /\./g;
let Zb = class {
    get language() {
        return Nx(this.locale)
    }
    get region() {
        return Z$(this.locale)
    }
    get countryCode() {
        return Z$(this.locale)
    }
    get languageDirection() {
        return Z3e.includes(this.language) ? Kp.Rtl : Kp.Ltr
    }
    get isRtlLanguage() {
        return this.languageDirection === Kp.Rtl
    }
    get isLtrLanguage() {
        return this.languageDirection === Kp.Ltr
    }
    constructor(t, {locale: n, currency: r, timezone: a, country: i, pseudolocalize: o=!1, onError: s, loading: l, interpolate: c}) {
        this.getCurrencySymbol = (u,d=this.locale)=>{
            const m = u || this.defaultCurrency;
            if (m == null)
                throw new xV("formatCurrency cannot be called without a currency code.");
            return this.getShortCurrencySymbol(m, d)
        }
        ,
        this.numberSymbols = Kl(()=>{
            const u = this.formatNumber(123456.7, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
            });
            let d, m;
            for (const h of u)
                isNaN(parseInt(h, 10)) && (d ? m = h : d = h);
            return {
                thousandSymbol: d,
                decimalSymbol: m
            }
        }
        ),
        this.translations = t,
        this.locale = n,
        this.defaultCountry = i,
        this.defaultCurrency = r,
        this.defaultTimezone = a,
        this.pseudolocalize = o,
        this.defaultInterpolate = c,
        this.onError = s || this.defaultOnError,
        this.loading = l || !1
    }
    translate(t, n, r) {
        const {pseudolocalize: a, defaultInterpolate: i} = this;
        let o;
        const s = {
            pseudotranslate: a,
            interpolate: i
        };
        n == null ? o = s : this.isTranslateOptions(n) ? o = {
            ...s,
            ...n,
            replacements: r
        } : o = {
            ...s,
            replacements: n
        };
        try {
            return tAe(t, o, this.translations, this.locale)
        } catch (l) {
            return this.onError(l),
            ""
        }
    }
    getTranslationTree(t, n) {
        try {
            return n ? a4(t, this.translations, this.locale, n) : a4(t, this.translations, this.locale)
        } catch (r) {
            return this.onError(r),
            ""
        }
    }
    translationKeyExists(t, n=!1) {
        try {
            const r = a4(t, this.translations, this.locale);
            return n ? typeof r == "string" : !0
        } catch {
            return !1
        }
    }
    formatNumber(t, {as: n, precision: r, ...a}={}) {
        const {locale: i, defaultCurrency: o} = this;
        return n === "currency" && o == null && a.currency == null ? (this.onError(new xV("formatNumber(amount, {as: 'currency'}) cannot be called without a currency code.")),
        "") : af(i, {
            style: n,
            maximumFractionDigits: r,
            currency: o,
            ...a
        }).format(t)
    }
    unformatNumber(t) {
        const {decimalSymbol: n} = this.numberSymbols()
          , r = this.normalizedNumber(t, n);
        return r === "" ? "" : parseFloat(r).toString()
    }
    formatCurrency(t, {form: n, ...r}={}) {
        switch (n) {
        case "auto":
            return this.formatCurrencyAuto(t, r);
        case "explicit":
            return this.formatCurrencyExplicit(t, r);
        case "short":
            return this.formatCurrencyShort(t, r);
        case "none":
            return this.formatCurrencyNone(t, r);
        default:
            return this.formatCurrencyAuto(t, r)
        }
    }
    unformatCurrency(t, n) {
        const {decimalSymbol: r} = this.numberSymbols()
          , a = BV.get(n.toUpperCase())
          , i = this.normalizedNumber(t, r, a);
        return i === "" ? "" : a === 0 ? `${parseFloat(i).toFixed(0)}.${"0".repeat(i4)}` : parseFloat(i).toFixed(a)
    }
    formatPercentage(t, n={}) {
        return this.formatNumber(t, {
            as: "percent",
            ...n
        })
    }
    formatDate(t, n={}) {
        const {locale: r, defaultTimezone: a} = this
          , {timeZone: i=a} = n
          , {style: o=void 0, ...s} = n || {};
        if (o)
            switch (o) {
            case Gs.Humanize:
                return this.humanizeDate(t, {
                    ...s,
                    timeZone: i
                });
            case Gs.DateTime:
                return this.formatDateTime(t, {
                    ...s,
                    timeZone: i,
                    ...RV[o]
                });
            default:
                return this.formatDate(t, {
                    ...s,
                    ...RV[o]
                })
            }
        return qc(t, r, {
            ...s,
            timeZone: i
        })
    }
    ordinal(t) {
        const {locale: n} = this
          , r = ug(n, {
            type: "ordinal"
        }).select(t);
        return this.translate(r, {
            scope: "ordinal"
        }, {
            amount: t
        })
    }
    weekStartDay(t) {
        const n = t || this.defaultCountry;
        if (!n)
            throw new K3e("weekStartDay() cannot be called without a country code.");
        return q3e.get(n) || H3e
    }
    getCurrencySymbolLocalized(t, n) {
        return this.getShortCurrencySymbol(n, t)
    }
    formatName(t, n, r) {
        return uie({
            name: {
                givenName: t,
                familyName: n
            },
            locale: this.locale,
            options: r
        })
    }
    abbreviateName({firstName: t, lastName: n, idealMaxLength: r=3}) {
        return j3e({
            name: {
                givenName: t,
                familyName: n
            },
            locale: this.locale,
            options: {
                idealMaxLength: r
            }
        })
    }
    abbreviateBusinessName({name: t, idealMaxLength: n=3}) {
        return V3e({
            name: t,
            idealMaxLength: n
        })
    }
    identifyScript(t) {
        return iAe(t)
    }
    hasEasternNameOrderFormatter() {
        return G3e(this.locale)
    }
    formatCurrencyAuto(t, n={}) {
        return n.currency == null || this.defaultCurrency == null || n.currency === this.defaultCurrency ? this.formatCurrencyShort(t, n) : this.formatCurrencyExplicit(t, n)
    }
    formatCurrencyExplicit(t, n={}) {
        const r = this.formatCurrencyShort(t, n)
          , a = n.currency || this.defaultCurrency || "";
        return r.includes(a) ? r : `${r} ${a}`
    }
    formatCurrencyShort(t, n={}) {
        var r;
        const a = this.formatCurrencyNone(t, n)
          , o = ((r = new RegExp(`${Eo.DirectionControl}*${Eo.Negative}`,"g").exec(a)) === null || r === void 0 ? void 0 : r.shift()) || ""
          , s = this.getShortCurrencySymbol(n.currency)
          , l = s.prefixed ? `${s.symbol}${a}` : `${a}${s.symbol}`;
        return `${o}${l.replace(o, "")}`
    }
    formatCurrencyNone(t, n={}) {
        const {locale: r} = this;
        let a = n.precision;
        if (a === void 0) {
            const i = n.currency || this.defaultCurrency || "";
            a = BV.get(i.toUpperCase())
        }
        return af(r, {
            style: "decimal",
            minimumFractionDigits: a,
            maximumFractionDigits: a,
            ...n
        }).format(t)
    }
    getShortCurrencySymbol(t=this.defaultCurrency || "", n=this.locale) {
        const r = t.substring(0, 2);
        let a;
        try {
            a = UV(n, {
                currency: t,
                currencyDisplay: "narrowSymbol"
            })
        } catch {
            a = UV(n, {
                currency: t
            })
        }
        if (t in MV)
            return {
                symbol: MV[t],
                prefixed: a.prefixed
            };
        const i = a.symbol.replace(r, "");
        return /[A-Za-zÀ-ÖØ-öø-ÿĀ-ɏḂ-ỳ]/.exec(i) ? a : {
            symbol: i,
            prefixed: a.prefixed
        }
    }
    humanizeDate(t, n) {
        return Ad(t) ? this.humanizeFutureDate(t, n) : this.humanizePastDate(t, n)
    }
    formatDateTime(t, n) {
        const {defaultTimezone: r} = this
          , {timeZone: a=r} = n;
        return this.translate("date.humanize.lessThanOneYearAway", {
            date: this.getDateFromDate(t, {
                ...n,
                timeZone: a
            }),
            time: this.getTimeFromDate(t, {
                ...n,
                timeZone: a
            })
        })
    }
    humanizePastDate(t, n) {
        if (iie(t))
            return this.translate("date.humanize.lessThanOneMinuteAgo");
        if (aie(t)) {
            const o = Math.floor((new Date().getTime() - t.getTime()) / jl.Minute);
            return this.translate("date.humanize.lessThanOneHourAgo", {
                count: o
            })
        }
        const r = n == null ? void 0 : n.timeZone
          , a = this.getTimeFromDate(t, n);
        if (G8(t, r))
            return a;
        if (sie(t, r))
            return this.translate("date.humanize.yesterday", {
                time: a
            });
        if (oie(t)) {
            const i = this.getWeekdayFromDate(t, n);
            return this.translate("date.humanize.lessThanOneWeekAgo", {
                weekday: i,
                time: a
            })
        }
        if (z8(t)) {
            const i = this.getMonthDayFromDate(t, n);
            return this.translate("date.humanize.lessThanOneYearAgo", {
                date: i,
                time: a
            })
        }
        return this.formatDate(t, {
            ...n,
            style: Gs.Short
        })
    }
    humanizeFutureDate(t, n) {
        const r = n == null ? void 0 : n.timeZone
          , a = this.getTimeFromDate(t, n);
        if (G8(t, r))
            return this.translate("date.humanize.today", {
                time: a
            });
        if (F3e(t, r))
            return this.translate("date.humanize.tomorrow", {
                time: a
            });
        if (O3e(t)) {
            const i = this.getWeekdayFromDate(t, n);
            return this.translate("date.humanize.lessThanOneWeekAway", {
                weekday: i,
                time: a
            })
        }
        if (R3e(t)) {
            const i = this.getMonthDayFromDate(t, n);
            return this.translate("date.humanize.lessThanOneYearAway", {
                date: i,
                time: a
            })
        }
        return this.formatDate(t, {
            ...n,
            style: Gs.Short
        })
    }
    getTimeZone(t, n) {
        const {localeMatcher: r, formatMatcher: a, timeZone: i} = n || {}
          , o = this.formatDate(t, {
            localeMatcher: r,
            formatMatcher: a,
            timeZone: i,
            hour12: !1,
            timeZoneName: "short",
            hour: "numeric"
        })
          , s = /\s([\w()+\-:.]+$)/.exec(o);
        return s ? s[1] : ""
    }
    getDateFromDate(t, n) {
        const {localeMatcher: r, formatMatcher: a, weekday: i, day: o, month: s, year: l, era: c, timeZone: u, timeZoneName: d} = n || {};
        return this.formatDate(t, {
            localeMatcher: r,
            formatMatcher: a,
            weekday: i,
            day: o,
            month: s,
            year: l,
            era: c,
            timeZone: u,
            timeZoneName: d === "short" ? void 0 : d
        })
    }
    getTimeFromDate(t, n) {
        const {localeMatcher: r, formatMatcher: a, hour12: i, timeZone: o, timeZoneName: s} = n || {}
          , l = this.formatDate(t, {
            localeMatcher: r,
            formatMatcher: a,
            hour12: i,
            timeZone: o,
            timeZoneName: s === "short" ? void 0 : s,
            hour: "numeric",
            minute: "2-digit"
        }).toLocaleLowerCase()
          , c = s === "short" ? `${l} ${this.getTimeZone(t, n)}` : l;
        return sAe(c)
    }
    getWeekdayFromDate(t, n) {
        const {localeMatcher: r, formatMatcher: a, hour12: i, timeZone: o} = n || {};
        return this.formatDate(t, {
            localeMatcher: r,
            formatMatcher: a,
            hour12: i,
            timeZone: o,
            weekday: "long"
        })
    }
    getMonthDayFromDate(t, n) {
        const {localeMatcher: r, formatMatcher: a, hour12: i, timeZone: o} = n || {};
        return this.formatDate(t, {
            localeMatcher: r,
            formatMatcher: a,
            hour12: i,
            timeZone: o,
            month: "short",
            day: "numeric"
        })
    }
    normalizedNumber(t, n, r=i4) {
        const a = Math.max(r, i4)
          , i = t.lastIndexOf(o4);
        let o = t.lastIndexOf(n);
        n !== o4 && (t.match(uAe) || []).length === 1 && this.decimalValue(t, i).length <= a && (o = i);
        const s = this.integerValue(t, o)
          , l = this.decimalValue(t, o)
          , c = new RegExp(`^(${Eo.DirectionControl}|\\s)*${Eo.Negative}`,"u")
          , m = `${t.match(c) ? lAe : ""}${s}${o === -1 ? "" : o4}${l}`;
        return m.match(cAe) ? m : ""
    }
    integerValue(t, n) {
        return t.substring(0, n).replace(jV, "")
    }
    decimalValue(t, n) {
        return t.substring(n + 1).replace(jV, "")
    }
    isTranslateOptions(t) {
        return "scope"in t
    }
    defaultOnError(t) {
        throw t
    }
}
;