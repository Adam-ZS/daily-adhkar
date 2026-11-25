# Contributing

Report a bug, suggest an improvement, or submit an Arabic text or source correction using the [issue templates](https://github.com/Adam-ZS/daily-adhkar/issues/new/choose). See the [Code of Conduct](CODE_OF_CONDUCT.md) and [accessibility statement](ACCESSIBILITY.md).

## Run locally

Clone the repository and serve it from its root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Use the server to check offline caching and open `adhkar.html` directly to check the standalone version.

## Prepare a pull request

- Edit `index.html` first, then run `cp index.html adhkar.html` to keep the standalone version in sync.
- For a text, reference, or repetition change, give the exact Arabic wording, the source with verse or hadith number, and the rationale. Note the grading and scholar where relevant.
- Check the four sections at phone and desktop widths. For interaction changes, test keyboard navigation, counters, reload, reduced motion, and offline reading as applicable.
- Include a screenshot for visible changes and list the browsers or devices you tested.
