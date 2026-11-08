# Editing this website

## Everyday changes

| Change | File |
| --- | --- |
| Homepage biography | `_pages/about.md` |
| Research introduction | `_includes/sections/research.md` |
| Submitted papers | `_bibliography/preprints.bib` |
| Accepted papers | `_bibliography/papers.bib` |
| Thesis | `_bibliography/thesis.bib` |
| Talks | `_bibliography/talks.bib` (introduction: `_includes/sections/talks.md`) |
| PDFs and slides | `assets/pdf/` |
| Contact and profile links | `_config.yml` |
| Typography and layout | `_sass/` |

Keep each page's YAML header between its opening and closing `---` lines.
A commit to `master` builds, checks local link targets, and publishes the website.
Check the **deploy** run in GitHub Actions if an edit does not appear.

## Bibliographies

Add entries to the appropriate BibTeX file, with unique keys.
To mark a paper accepted, move its entry from preprints.bib to papers.bib and update the journal information.
Local `pdf`, `slides`, and `poster` filenames resolve inside `assets/pdf/`.
External URLs are allowed as ordinary links; they are not embedded resources.
Thumbnails resolve inside `assets/img/publication_preview/`.
Research entries use `_layouts/researchbib.html`; talks use `_layouts/talks-bib.html`.
The legacy bibliography renderer is `_layouts/bib.html`; the compact CV renderer is `_layouts/shortbib.html`.

## CV

The CV remains disabled through `nav: false` and `published: false` in `_pages/cv.md`.
Before re-enabling it, review the personal information in `_layouts/cv.html`.
Set `nav: true` and remove `published: false` when ready.
The standalone file `assets/pdf/CV.pdf` is independent of the page.

## Local build

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll build
python3 scripts/check_links.py _site
bundle exec jekyll serve
```

The link check verifies local pages and asset files, not remote URLs or fragment IDs.
The repository deliberately keeps CSS and JavaScript local. MathJax renders mathematics;
Palatino uses locally installed fonts with serif fallbacks.

## Dependencies and rollback

Commit Gemfile.lock after intentional dependency updates; ordinary builds should reuse it.
GitHub Actions and the hosted Ruby/Ubuntu versions are pinned in the deployment workflow.
Do not edit generated output on the deployment branch.
To undo an edit, revert its commit on master rather than rewriting history.

## Page structure

About, Research, and Talks are separate pages at `/`, `/research/`, and `/talks/`.
About text stays in `_pages/about.md`. Research and Talks content stays in
`_includes/sections/research.md` and `_includes/sections/talks.md`.
All three use `_layouts/reading-page.html`, with shared text-size controls and styling.

## Repository scope

The live site uses About, Research, and Talks, plus the 404 page. Unused al-folio
blog and archive layouts, project galleries, repository cards, sample data, and
demo media have been removed. The disabled CV page and its supporting templates
are retained, together with personal PDFs, slides, images, and bibliography files.

Shared Sass, scripts, fonts, libraries, and their license notices remain in place
where the current templates import or reference them. Some shared files still
contain theme rules for optional features; removing those rules is a separate
styling change and is outside this repository cleanup.

GitHub Actions is the deployment path; the old Docker entry point and manual
force-push deployment script are no longer included.
