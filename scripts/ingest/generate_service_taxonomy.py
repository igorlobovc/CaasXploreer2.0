from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE_FILE = ROOT / "data/raw/manual_review/MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_QA.csv"

CATEGORY_OUTPUT = ROOT / "data/reference/category_dictionary/categories.json"
SUBCATEGORY_OUTPUT = ROOT / "data/reference/subcategory_dictionary/subcategories.json"
SERVICE_OUTPUT = ROOT / "data/reference/service_dictionary/services.json"
THEME_OUTPUT = ROOT / "data/reference/theme_dictionary/themes.json"


def clean(value: str | None) -> str:
    return (value or "").strip()


def sorted_links(counter: Counter[str]) -> list[dict[str, int | str]]:
    return [{"name": name, "count": count} for name, count in sorted(counter.items())]


def write_json(path: Path, payload: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    category_counts: Counter[str] = Counter()
    subcategory_counts: Counter[str] = Counter()
    cluster_counts: Counter[str] = Counter()
    service_counts: Counter[str] = Counter()

    category_subcategories: dict[str, Counter[str]] = defaultdict(Counter)
    subcategory_categories: dict[str, Counter[str]] = defaultdict(Counter)
    cluster_services: dict[str, Counter[str]] = defaultdict(Counter)
    service_clusters: dict[str, Counter[str]] = defaultdict(Counter)

    with SOURCE_FILE.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            category = clean(row.get("categoria_canonica"))
            subcategory = clean(row.get("subcategoria_canonica"))
            cluster = clean(row.get("cluster_servico"))
            service = clean(row.get("tema_servico"))

            if category:
                category_counts[category] += 1
            if subcategory:
                subcategory_counts[subcategory] += 1
            if cluster:
                cluster_counts[cluster] += 1
            if service:
                service_counts[service] += 1

            if category and subcategory:
                category_subcategories[category][subcategory] += 1
                subcategory_categories[subcategory][category] += 1

            if cluster and service:
                cluster_services[cluster][service] += 1
                service_clusters[service][cluster] += 1

    categories = {
        category: {
            "count": count,
            "subcategories": sorted_links(category_subcategories[category]),
        }
        for category, count in sorted(category_counts.items())
    }

    subcategories = {
        subcategory: {
            "count": count,
            "categories": sorted_links(subcategory_categories[subcategory]),
        }
        for subcategory, count in sorted(subcategory_counts.items())
    }

    services = {
        service: {
            "count": count,
            "clusters": sorted_links(service_clusters[service]),
        }
        for service, count in sorted(service_counts.items())
    }

    themes = {
        cluster: {
            "count": count,
            "services": sorted_links(cluster_services[cluster]),
        }
        for cluster, count in sorted(cluster_counts.items())
    }

    write_json(CATEGORY_OUTPUT, categories)
    write_json(SUBCATEGORY_OUTPUT, subcategories)
    write_json(SERVICE_OUTPUT, services)
    write_json(THEME_OUTPUT, themes)

    print(
        json.dumps(
            {
                "categoria_canonica": len(category_counts),
                "subcategoria_canonica": len(subcategory_counts),
                "cluster_servico": len(cluster_counts),
                "tema_servico": len(service_counts),
                "files": [
                    str(CATEGORY_OUTPUT.relative_to(ROOT)),
                    str(SUBCATEGORY_OUTPUT.relative_to(ROOT)),
                    str(SERVICE_OUTPUT.relative_to(ROOT)),
                    str(THEME_OUTPUT.relative_to(ROOT)),
                ],
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
