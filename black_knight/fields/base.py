class BaseField:

    def base_info(self, **kwargs):
        infos = {
            'required': not self.blank,
            'help_text': self.help_text,
            'initial': self.get_default(),
            'label': self.verbose_name,
            'name': self.name,
        }

        if self.choices is not None:
            infos['choices'] = self.get_choices(include_blank=False)

        infos.update(kwargs)

        return infos
