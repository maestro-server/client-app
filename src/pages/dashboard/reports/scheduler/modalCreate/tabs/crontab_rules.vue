<template>
  <table
    border="1"
    class="table table-striped table-bordered"
  >
    <colgroup>
      <col width="13%">
      <col width="5%">
      <col width="82%">
    </colgroup>
    <thead valign="bottom">
    <tr class="row-odd">
      <th class="head">
        Expression
      </th>
      <th class="head">
        Field
      </th>
      <th class="head">
        Description
      </th>
    </tr>
    </thead>
    <tbody valign="top">
    <tr class="row-even">
      <td><code class="docutils literal notranslate"><span class="pre">*</span></code></td>
      <td>any</td>
      <td>Fire on every value</td>
    </tr>
    <tr class="row-odd">
      <td><code class="docutils literal notranslate"><span class="pre">*/a</span></code></td>
      <td>any</td>
      <td>
        Fire every <code class="docutils literal notranslate"><span class="pre">a</span></code> values, starting from
        the minimum
      </td>
    </tr>
    <tr class="row-even">
      <td><code class="docutils literal notranslate"><span class="pre">a-b</span></code></td>
      <td>any</td>
      <td>
        Fire on any value within the <code class="docutils literal notranslate"><span class="pre">a-b</span></code>
        range (a must be smaller than b)
      </td>
    </tr>
    <tr class="row-odd">
      <td><code class="docutils literal notranslate"><span class="pre">a-b/c</span></code></td>
      <td>any</td>
      <td>
        Fire every <code class="docutils literal notranslate"><span class="pre">c</span></code> values within the
        <code class="docutils literal notranslate"><span class="pre">a-b</span></code> range
      </td>
    </tr>
    <tr class="row-even">
      <td><code class="docutils literal notranslate"><span class="pre">xth</span> <span class="pre">y</span></code></td>
      <td>day</td>
      <td>
        Fire on the <code class="docutils literal notranslate"><span class="pre">x</span></code> -th occurrence of
        weekday <code class="docutils literal notranslate"><span class="pre">y</span></code> within the month
      </td>
    </tr>
    <tr class="row-odd">
      <td>
        <code class="docutils literal notranslate"><span class="pre">last</span> <span class="pre">x</span></code>
      </td>
      <td>day</td>
      <td>
        Fire on the last occurrence of weekday <code class="docutils literal notranslate"><span
        class="pre"
      >x</span></code> within the month
      </td>
    </tr>
    <tr class="row-even">
      <td><code class="docutils literal notranslate"><span class="pre">last</span></code></td>
      <td>day</td>
      <td>Fire on the last day within the month</td>
    </tr>
    <tr class="row-odd">
      <td><code class="docutils literal notranslate"><span class="pre">x,y,z</span></code></td>
      <td>any</td>
      <td>Fire on any matching expression; can combine any number of any of the above expressions</td>
    </tr>
    </tbody>
  </table>
</template>
