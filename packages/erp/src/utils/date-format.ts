export interface DateFunType {
    year: () => number;
    month: () => number;
    day: () => number;
    weekday: () => number;
    hour: () => number;
    minute: () => number;
    second: () => number;
}


const J3e = 50;
function Ql(e: Function, t: any) {
    const n = new WeakMap
        , r = new Map
        , a: any = [];
    return function (...o: any) {
        if (typeof window > "u")
            return e(...o);
        const s = o.length === 1 && typeof o[0] == "object" && !t;
        let l;
        s ? l = o[0] : t && t instanceof Function ? l = t(...o) : l = o[0];
        const c = s ? n : r;
        if (c.has(l))
            return c.get(l);
        const u = e(...o);
        if (s)
            n.set(l, u);
        else if (r.set(l, u),
            a.push(l),
            r.size > J3e) {
            const d = a[0];
            r.delete(d),
                a.shift()
        }
        return u
    }
}
function Y_(e: string) {
    return e.replace("‎", "")
}
const s4 = new Map;
function DV(e?: string, t?: Intl.DateTimeFormatOptions) {
    const n = getDateKey(e, t);
    if (s4.has(n))
        return s4.get(n);
    const r = new Intl.DateTimeFormat(e, t);
    return s4.set(n, r), r
}
const LV = Intl.DateTimeFormat("en", { hour: "numeric" })
    , BV = typeof LV.resolvedOptions > "u" ? void 0 : LV.resolvedOptions();
function formatDateTime(e: Date, locales: string, n: Intl.DateTimeFormatOptions = {}) {
    if (BV != null && n.hour12 === !1 && BV.hourCycle != null && (n.hour12 = void 0,
        n.hourCycle = "h23"),
        n.timeZone != null && n.timeZone === "Etc/GMT+12") {
        const a = new Date(e.valueOf() - 432e5);
        return DV(locales, {
            ...n,
            timeZone: "UTC"
        }).format(a)
    }
    return DV(locales, n).format(e)
}
function getDateKey(e?: string, t = {}) {
    return `${Array.isArray(e) ? e.sort().join("-") : e}-${JSON.stringify(t)}`
}
const l4 = /(\d{2})/;

function useDateFun(e: Date, t?: string): DateFunType {
    return {
        year: () => Fa.getYear(e, t),
        month: () => Fa.getMonth(e, t),
        day: () => Fa.getDay(e, t),
        weekday: () => Fa.getWeekday(e, t),
        hour: () => Fa.getHour(e, t),
        minute: () => Fa.getMinute(e, t),
        second: () => Fa.getSecond(e, t)
    }
}
function Id(e: string) {
    return (t: Date, n: string) => `${e}-${t.toString()}-${n}`
}
var UV: any;
(function (e) {
    e.Monday = "Monday",
        e.Tuesday = "Tuesday",
        e.Wednesday = "Wednesday",
        e.Thursday = "Thursday",
        e.Friday = "Friday",
        e.Saturday = "Saturday",
        e.Sunday = "Sunday"
}
)(UV || (UV = {}));
const Sie: { [key: string]: number } = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6
};
function tAe(e: string) {
    return Object.keys(Sie).some(t => t === e)
}
function nAe(e: string) {
    throw new Error(e)
}
function rAe(e: string) {
    return tAe(e) ? Sie[e] : nAe(`Unexpected weekday: ${e}`)
}
class Fa {

    static getYear = Ql((e: Date, t?: string) => {
        if (isNaN(e.valueOf()))
            throw new Error(`Unable to parse date: ${e} for timezone: ${t}`);
        const n = formatDateTime(e, "en", {
            timeZone: t,
            year: "numeric"
        })
            , r = Y_(n)
            , a = parseInt(r, 10);
        if (isNaN(a))
            throw new Error(`Unable to parse year: '${n}'`);
        return a
    }, Id("year"));

    static getMonth = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            month: "numeric"
        })
            , r = Y_(n)
            , a = parseInt(r, 10);
        if (isNaN(a))
            throw new Error(`Unable to parse month: '${n}'`);
        return a
    }, Id("month"));

    static getDay = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            day: "numeric"
        })
            , r = Y_(n)
            , a = parseInt(r, 10);
        if (isNaN(a))
            throw new Error(`Unable to parse day: '${n}'`);
        return a
    }
        , Id("day"));
    static getWeekday = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            weekday: "long"
        })
            , r = Y_(n);
        return rAe(r)
    }, Id("weekday"));
    static getHour = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            hour12: !1,
            hour: "numeric"
        });
        let r = parseInt(n, 10);
        return isNaN(r) && (r = Fa.getTimePartsFallback(e, t).hour),
            r
    }, Id("hour"));
    static getMinute = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            minute: "numeric"
        });
        let r = parseInt(n, 10);
        return isNaN(r) && (r = Fa.getTimePartsFallback(e, t).minute),
            r
    }, Id("minute"));
    static getSecond = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            second: "numeric"
        });
        let r = parseInt(n, 10);
        return isNaN(r) && (r = Fa.getTimePartsFallback(e, t).second),
            r
    }, Id("second"));
    static getTimePartsFallback = Ql((e: Date, t?: string) => {
        const n = formatDateTime(e, "en", {
            timeZone: t,
            hour12: !1,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
            , [r, a, i] = n.split(":")
            , o = new RegExp(l4).exec(r)
            , s = new RegExp(l4).exec(a)
            , l = new RegExp(l4).exec(i);
        if (o != null && s != null && l != null) {
            const c = parseInt(o[1], 10)
                , u = parseInt(s[1], 10)
                , d = parseInt(l[1], 10);
            return {
                hour: c,
                minute: u,
                second: d
            }
        }
        throw new Error(`Unable to parse timeString: '${n}'`)
    }, Id("timePartsFallback"));
}

function getTimeZoneOffset(e = new Date, t?: string, n?: string) {
    const r = getUTCDate(e, t), a = getUTCDate(e, n);
    return (r.valueOf() - a.valueOf()) / (1e3 * 60)
}
function getUTCDate(e: Date, t?: string) {
    const { year: n, month: r, day: a, hour: i, minute: o, second: s } = useDateFun(e, t);
    return new Date(Date.UTC(n(), r() - 1, a(), i(), o(), s()))
}
function aAe(e: Date, t?: string, n?: string) {
    const r = getTimeZoneOffset(e, t, n)
        , a = new Date(e.valueOf() - r * 60 * 1e3)
        , o = getTimeZoneOffset(a, t, n) - r;
    return new Date(a.valueOf() - o * 60 * 1e3)
}
let $l: any;
(function (e) {
    e[e.Second = 1e3] = "Second",
        e[e.Minute = 6e4] = "Minute",
        e[e.Hour = 36e5] = "Hour",
        e[e.Day = 864e5] = "Day",
        e[e.Week = 6048e5] = "Week",
        e[e.Year = 31536e6] = "Year"
}
)($l || ($l = {}));

function iAe(e: number, t: Date, n = new Date) {
    return Math.floor((n.getTime() - t.getTime()) / e)
}
function isBeforeToday(e: Date, t = new Date) {
    return t < e
}
function _ie(e: Date, t = new Date) {
    return !isBeforeToday(e, t) && t.getTime() - e.getTime() < $l.Hour
}
function kie(e: Date, t = new Date) {
    return !isBeforeToday(e, t) && t.getTime() - e.getTime() < $l.Minute
}
function Eie(e: Date, t = new Date) {
    return !isBeforeToday(e, t) && t.getTime() - e.getTime() < $l.Week
}
function oAe(e: Date, t = new Date) {
    return isBeforeToday(e, t) && e.getTime() - t.getTime() < $l.Week
}
function Y8(e: Date, t = new Date) {
    return !isBeforeToday(e, t) && t.getTime() - e.getTime() < $l.Year
}
function sAe(e: Date, t = new Date) {
    return isBeforeToday(e, t) && e.getTime() - t.getTime() < $l.Year
}
function isEqualYear(e: Date, t: Date, n?: string) {
    const { year: r } = useDateFun(e, n)
        , { year: a } = useDateFun(t, n);
    return r() === a()
}
function isEqualMonth(e: Date, t: Date, n?: string) {
    const { month: r } = useDateFun(e, n)
        , { month: a } = useDateFun(t, n);
    return isEqualYear(e, t, n) && r() === a()
}
function isEqualDay(e: Date, t: Date, n?: string) {
    const { day: r } = useDateFun(e, n)
        , { day: a } = useDateFun(t, n);
    return isEqualMonth(e, t, n) && r() === a()
}
function isToday(e: Date, t: string) {
    return isEqualDay(e, new Date, t)
}
function isYesterday(e: Date, t: string) {
    const n = new Date
        , r = new Date(n.valueOf() - 24 * 60 * 60 * 1e3);
    return isEqualDay(e, r, t)
}
function isTomorrow(e: Date, t: string) {
    const n = new Date
        , r = new Date(n.valueOf() + 24 * 60 * 60 * 1e3);
    return isEqualDay(e, r, t)
}
const dAe = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(?:(Z|(?:(\+|-)(\d{2}):(\d{2}))))?)?$/;
function dateStringParse(e: string) {
    const t = new RegExp(dAe).exec(e);
    if (t == null)
        return null;
    const [n, r, a, i, o, s, l, c, u, d, m] = Array.from(t).slice(1);
    return {
        year: n,
        month: r,
        day: a,
        hour: i,
        minute: o,
        second: s,
        millisecond: l,
        timeZoneOffset: c,
        sign: u,
        timeZoneHour: d,
        timeZoneMinute: m
    }
}
function stringToDate(e: string, t?: string) {
    const n = dateStringParse(e);
    if (n == null)
        return null;
    const { year: r, month: a, day: i, hour: o, minute: s, second: l, millisecond: c, timeZoneOffset: u, sign: d, timeZoneHour: m, timeZoneMinute: h } = n
        , g = parseInt(r, 10)
        , v = parseInt(a, 10)
        , y = parseInt(i, 10)
        , S = o == null ? 0 : parseInt(o, 10)
        , k = s == null ? 0 : parseInt(s, 10)
        , E = l == null ? 0 : parseInt(l, 10)
        , C = c == null ? 0 : parseInt(c, 10)
        , I = m == null ? 0 : parseInt(m, 10)
        , T = h == null ? 0 : parseInt(h, 10)
        , N = new Date(Date.UTC(g, v - 1, y, S, k, E, C));
    if (u === "Z")
        return N;
    if (d == null)
        return aAe(N, t, "UTC");
    switch (d) {
        case "+":
            return N.setHours(N.getHours() - I),
                N.setMinutes(N.getMinutes() - T),
                N;
        case "-":
            return N.setHours(N.getHours() + I),
                N.setMinutes(N.getMinutes() + T),
                N;
        default:
            return null
    }
}

export { useDateFun, stringToDate, Fa, getTimeZoneOffset, getUTCDate, aAe, DV, isEqualDay, isEqualYear, formatDateTime };