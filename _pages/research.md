---
layout: page
permalink: /research/
title: Research
description:
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

{% bibliography -f {{ site.scholar.bibliography }} %}

</div>

# PhD Thesis
<div class="publications">

 {% bibliography -f thesis --group_by none %}

</div>
