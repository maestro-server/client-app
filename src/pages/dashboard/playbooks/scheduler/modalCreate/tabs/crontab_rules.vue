<template>
    <table border="1" class="table table-striped table-bordered">
    <colgroup>
        <col width="48%" />
        <col width="52%" />
    </colgroup>

    <tbody valign="top">
        <tr class="row-odd">
        <td><strong>Example</strong></td>

        <td><strong>Meaning</strong></td>
        </tr>

        <tr class="row-even">
        <td><code class="docutils literal"><span class="pre">minute=*, hour=*, day_of_week=*,  day_of_month=* and month_of_year=*</span></code></td>

        <td>Execute every minute.</td>
        </tr>

        <tr class="row-odd">
        <td><code class="docutils literal"><span class="pre">minute=0,</span>
        <span class="pre">hour=0</span></code></td>

        <td>Execute daily at midnight.</td>
        </tr>

        <tr class="row-even">
        <td><code class="docutils literal"><span class="pre">minute=0,</span>
        <span class="pre">hour='*/3'</span></code></td>

        <td>Execute every three hours: midnight, 3am, 6am, 9am, noon, 3pm, 6pm, 9pm.</td>
        </tr>

        <tr class="row-odd">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class=
            "pre">minute=0,</span></code></dt>

            <dd><code class="docutils literal"><span class=
            "pre">hour='0,3,6,9,12,15,18,21'</span></code></dd>
            </dl>
        </td>

        <td>Same as previous.</td>
        </tr>

        <tr class="row-even">
        <td><code class="docutils literal"><span class=
        "pre">minute='*/15'</span></code></td>

        <td>Execute every 15 minutes.</td>
        </tr>

        <tr class="row-odd">
        <td><code class="docutils literal"><span class=
        "pre">day_of_week='sunday'</span></code></td>

        <td>Execute every minute (!) at Sundays.</td>
        </tr>

        <tr class="row-even">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class=
            "pre">minute='*',</span></code></dt>

            <dd><code class="docutils literal"><span class="pre">hour='*',</span></code>
            <code class="docutils literal"><span class=
            "pre">day_of_week='sun'</span></code></dd>
            </dl>
        </td>

        <td>Same as previous.</td>
        </tr>

        <tr class="row-odd">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class=
            "pre">minute='*/10',</span></code></dt>

            <dd><code class="docutils literal"><span class=
            "pre">hour='3,17,22',</span></code> <code class=
            "docutils literal"><span class=
            "pre">day_of_week='thu,fri'</span></code></dd>
            </dl>
        </td>

        <td>Execute every ten minutes, but only between 3-4 am, 5-6 pm, and 10-11 pm on
        Thursdays or Fridays.</td>
        </tr>

        <tr class="row-even">
        <td><code class="docutils literal"><span class="pre">minute=0,</span>
        <span class="pre">hour='*/2,*/3'</span></code></td>

        <td>Execute every even hour, and every hour divisible by three. This means: at
        every hour <em>except</em>: 1am, 5am, 7am, 11am, 1pm, 5pm, 7pm, 11pm</td>
        </tr>

        <tr class="row-odd">
        <td><code class="docutils literal"><span class="pre">minute=0,</span>
        <span class="pre">hour='*/5'</span></code></td>

        <td>Execute hour divisible by 5. This means that it is triggered at 3pm, not 5pm
        (since 3pm equals the 24-hour clock value of &ldquo;15&rdquo;, which is divisible
        by 5).</td>
        </tr>

        <tr class="row-even">
        <td><code class="docutils literal"><span class="pre">minute=0,</span>
        <span class="pre">hour='*/3,8-17'</span></code></td>

        <td>Execute every hour divisible by 3, and every hour during office hours
        (8am-5pm).</td>
        </tr>

        <tr class="row-odd">
        <td><code class="docutils literal"><span class="pre">day_of_month='2'</span>
        </code></td>

        <td>Execute on the second day of every month.</td>
        </tr>

        <tr class="row-even">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class="pre">day_of_month='2-30/3'</span></code></dt>
            </dl>
        </td>

        <td>Execute on every even numbered day.</td>
        </tr>

        <tr class="row-odd">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class="pre">day_of_month='1-7,15-21'</span></code></dt>
            </dl>
        </td>

        <td>Execute on the first and third weeks of the month.</td>
        </tr>

        <tr class="row-even">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class="pre">day_of_month='11',</span></code></dt>

            <dd><code class="docutils literal"><span class=
            "pre">month_of_year='5'</span></code></dd>
            </dl>
        </td>

        <td>Execute on the eleventh of May every year.</td>
        </tr>

        <tr class="row-odd">
        <td>
            <dl class="first last docutils">
            <dt><code class="docutils literal"><span class="pre">month_of_year='*/3'</span></code></dt>
            </dl>
        </td>

        <td>Execute on the first month of every quarter.</td>
        </tr>
    </tbody>
    
    </table>
    
</template>