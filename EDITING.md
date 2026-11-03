# Editing this website

## Everyday changes

| Change | File |
| --- | --- |
| Homepage biography | `_pages/about.md` |
| Research introduction | `_pages/research.md` |
| Submitted papers | `_bibliography/preprints.bib` |
| Accepted papers | `_bibliography/papers.bib` |
| Thesis | `_bibliography/thesis.bib` |
| Talks | `_bibliography/talks.bib` |
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
The entry renderer is `_layouts/bib.html`; the compact CV renderer is `_layouts/shortbib.html`.

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
