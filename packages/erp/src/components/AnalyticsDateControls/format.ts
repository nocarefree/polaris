import { DV as g } from "../../utils/date-format";
const e = {
    numericFromTwoDigit: (o: string) => o.startsWith("0") && o.length === 2 ? o.charAt(1) : o,
    twoDigitFromNumeric: (o: string) => o.length === 1 ? `0${o}` : o,
    lowercase: (o: string) => o.toLowerCase()
}
    , r: any = {
        YYYY: {
            type: "year",
            options: {
                year: "numeric"
            }
        },
        YY: {
            type: "year",
            options: {
                year: "2-digit"
            }
        },
        MMMM: {
            type: "month",
            options: {
                month: "long"
            }
        },
        MMM: {
            type: "month",
            options: {
                month: "short"
            }
        },
        MM: {
            type: "month",
            options: {
                month: "2-digit"
            }
        },
        M: {
            type: "month",
            options: {
                month: "numeric"
            }
        },
        DD: {
            type: "day",
            options: {
                day: "2-digit"
            }
        },
        D: {
            type: "day",
            options: {
                day: "numeric"
            }
        },
        HH: {
            type: "hour",
            options: {
                hour: "2-digit",
                hour12: !1
            }
        },
        H: {
            type: "hour",
            options: {
                hour: "numeric",
                hour12: !1
            },
            extraTransform: e.numericFromTwoDigit
        },
        hh: {
            type: "hour",
            options: {
                hour: "2-digit",
                hour12: !0
            }
        },
        h: {
            type: "hour",
            options: {
                hour: "numeric",
                hour12: !0
            }
        },
        mm: {
            type: "minute",
            options: {
                minute: "2-digit"
            },
            extraTransform: e.twoDigitFromNumeric
        },
        m: {
            type: "minute",
            options: {
                minute: "numeric"
            }
        },
        ss: {
            type: "second",
            options: {
                second: "2-digit"
            },
            extraTransform: e.twoDigitFromNumeric
        },
        s: {
            type: "second",
            options: {
                second: "numeric"
            }
        },
        A: {
            type: "dayPeriod",
            options: {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: !0
            }
        },
        a: {
            type: "dayPeriod",
            options: {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: !0
            },
            extraTransform: e.lowercase
        },
        dddd: {
            type: "weekday",
            options: {
                weekday: "long"
            }
        },
        ddd: {
            type: "weekday",
            options: {
                weekday: "short"
            }
        }
    }
    , l = new RegExp(`(${Object.keys(r).join("|")})`, "g");
function formatDateToString(o: Date, s: string, m?: string, locals?: string) {
    const { locale: p, timeZone: d } = g(locals, {
        timeZone: m
    }).resolvedOptions();
    return s.replace(l, (u: string) => {
        var i;
        const { type: y, options: h, extraTransform: n } = r[u]
            , t = (i = Intl.DateTimeFormat(p, {
                timeZone: d,
                ...h
            }).formatToParts(o).find(c => c.type === y)) === null || i === void 0 ? void 0 : i.value;
        return t !== void 0 && n ? n(t) : t ?? ""
    }
    )
}
export { formatDateToString };
